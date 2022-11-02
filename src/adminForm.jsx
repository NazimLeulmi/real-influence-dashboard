import React from "react";
import { useForm, Controller } from "react-hook-form";
import AuthInput from "./auth/input";
import AuthBtn from "./auth/button";
import axios from "axios";
import validation from "./auth/validation";
import FormHeader from "./auth/header";
import { Logo, Form } from "./signin";
import { styled, Box } from "@mui/material";
import Drawer from "./shared/drawer";
import Model from "./assets/model.png";
import { useNavigate } from "react-router-dom";
import fetchAdmin from "./requests/fetchAdmin";
import { useQuery } from "@tanstack/react-query";
import { LoadingContainer } from "./signin";
import LoadingImage from "./assets/loading.svg";
import Panda from "./assets/panda.png";

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

function AdminForm() {
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
  const navigate = useNavigate();

  const { data: admin, isLoading: Loading } = useQuery(["admin"], fetchAdmin);

  function togglePasswordVisiblity() {
    console.log("Toggled Password Visiblity");
    setShowPassword((prevState) => !prevState);
  }

  function handleMouseDownPassword(event) {
    event.preventDefault();
  }

  if (Loading) {
    return (
      <LoadingContainer>
        <img src={LoadingImage} />
      </LoadingContainer>
    );
  }

  if (!admin) return navigate("/");

  async function onSubmit(formData) {
    try {
      setLoading(true);
      console.log("admin form data", formData);
      let response = await axios.post(
        "https://realinfluence.io/admins/signup",
        formData
      );
      let data = await response.data;
      if (data.isValid === true) navigate("/admins");
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
          <Logo src={Panda} />
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
          <img src={Model} style={{ width: "100%", height: "100%" }} />
        </ImgContainer>
      </Content>
    </Container>
  );
}

export default AdminForm;
