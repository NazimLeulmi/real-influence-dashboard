import React from "react";
import { useForm, Controller } from "react-hook-form";
import AuthInput from "../auth/input";
import AuthBtn from "../auth/button";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import validation from "../auth/validation";
import FormHeader from "../auth/header";
import { Logo, Form, Side } from ".";
import { styled, Box } from "@mui/material";
import Drawer from "../shared/drawer";
import Model from "../public/model.png";
import Admin from "../public/admin.png";

const Container = styled("main")(({ theme }) => ({
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
}));
const Content = styled(Box)(({ theme }) => ({
  maxHeight: "100vh",
  overflow: "scroll",
  width: "100%",
  display: "grid",
  gridTemplateColumns: "2fr 1.5fr",
  alignItems: "center",
}));

const ImgContainer = styled(Box)(({ theme }) => ({
  height: "90%",
  background: "rgba(0,0,0,.05)",
  position: "relative",
  marginRight: 30,
  borderRadius: 20,
}));

function SignUp({ admin }) {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordc: "",
    },
  });
  const password = React.useRef({});
  password.current = watch("password", "");
  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  function togglePasswordVisiblity() {
    console.log("Toggled Password Visiblity");
    setShowPassword((prevState) => !prevState);
  }

  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  async function onSubmit(formData) {
    try {
      setLoading(true);
      console.log("admin form data", formData);
      let response = await axios.post(
        "http://localhost:8888/admins/signup",
        formData
      );
      let data = await response.data;
      if (data.isValid === true) router.push("/admins");
      for (const errorName in data.errors) {
        console.log(`${errorName}: ${data.errors[errorName]}`);
        if (data.errors[errorName]) {
          setError(errorName, {
            type: "server",
            message: data.errors[errorName],
          });
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <Drawer admin={admin} />
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Logo>
            <Image src={Admin} layout="fill" />
          </Logo>
          <FormHeader href="/signup" />
          <Controller
            rules={validation.email}
            name="email"
            control={control}
            render={({ field }) => (
              <AuthInput
                field={field}
                label="Email Address"
                placeholder="Enter a valid email address"
                error={errors.email}
                type="email"
              />
            )}
          />
          <Controller
            rules={validation.username}
            name="username"
            control={control}
            render={({ field }) => (
              <AuthInput
                field={field}
                label="Username"
                placeholder="Enter your username"
                error={errors.username}
                type="text"
              />
            )}
          />
          <Controller
            rules={validation.password}
            name="password"
            control={control}
            render={({ field }) => (
              <AuthInput
                field={field}
                label="Password"
                placeholder="Enter your password"
                error={errors.password}
                togglePasswordVisiblity={togglePasswordVisiblity}
                handleMouseDownPassword={handleMouseDownPassword}
                showPassword={showPassword}
                type={showPassword ? "text" : "password"}
              />
            )}
          />
          <Controller
            rules={{
              validate: (value) =>
                value === password.current ||
                "The password confirmation doesn't match",
              ...validation.passwordc,
            }}
            name="passwordc"
            control={control}
            render={({ field }) => (
              <AuthInput
                field={field}
                label="Password Confirmation"
                placeholder="Confirm your password"
                error={errors.passwordc}
                togglePasswordVisiblity={togglePasswordVisiblity}
                handleMouseDownPassword={handleMouseDownPassword}
                showPassword={showPassword}
                type={showPassword ? "text" : "password"}
              />
            )}
          />
          <AuthBtn disabled={loading}>ADD ADMIN</AuthBtn>
        </Form>
        <ImgContainer boxShadow={2}>
          <Image src={Model} layout="fill" />
        </ImgContainer>
      </Content>
    </Container>
  );
}

export async function getServerSideProps({ req }) {
  let response = await axios.get("http://localhost:8888/admins/check-auth", {
    withCredentials: true,
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  let data = response.data;
  if (data.admin === null || data.admin.super === false) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: { admin: data.admin } };
}

export default SignUp;
