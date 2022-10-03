import React from "react";
import { useForm, Controller } from "react-hook-form";
import AuthInput from "../auth/input";
import AuthBtn from "../auth/button";
import { styled, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import SideImg from "../public/model.jpg";
import Bg from "../public/background.jpg";
import LogoImg from "../public/logo.png";
import axios from "axios";
import { useRouter } from "next/router";

const Container = styled("div")(() => ({
  width: "100vw",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}));

const BgImage = styled(Image)(() => ({
  width: "100%",
  height: "100%",
}));
const Overlay = styled("div")(() => ({
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255,255,255,.5)",
  position: "absolute",
}));

const Logo = styled("div")(() => ({
  width: 80,
  height: 80,
  position: "relative",
  marginBottom: 50,
}));
const Header = styled(Typography)(() => ({
  width: 400,
}));

const SideImage = styled(Image)(() => ({
  width: "100%",
  height: "100%",
}));

const Card = styled("div")(() => ({
  backgroundColor: "rgba(255,255,255,.85)",
  width: "70vw",
  height: "90vh",
  maxWidth: 1000,
  display: "flex",
  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  position: "relative",
}));

const Form = styled("form")(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  overflowY: "scroll",
}));

const Side = styled("div")(() => ({
  flex: 1,
  backgroundColor: "lightgray",
  position: "relative",
}));

const FormLink = styled("p")(() => ({
  width: 400,
  textDecoration: "none",
  textAlign: "center",
  cursor: "pointer",
}));

const Span = styled("span")(({ theme }) => ({
  fontWeight: "bold",
  display: "inline-block",
}));

function SignUp() {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      passwordc: "",
    },
  });
  const password = React.useRef({});
  password.current = watch("password", "");
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  async function onSubmit(formData) {
    try {
      setLoading(true);
      console.log("admin form data", formData);
      let response = await axios.post(
        "http://localhost:8888/admin-signup",
        formData
      );
      let data = await response.data;
      if (data.isValid === true) router.push("/");
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
      <BgImage src={Bg} layout="fill" />
      <Overlay />
      <Card>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Logo>
            <Image src={LogoImg} layout="fill" />
          </Logo>
          <Controller
            rules={{
              required: { value: true, message: "The email is required" },
              minLength: {
                value: 6,
                message: "The minimum length is 6 characters",
              },
              maxLength: {
                value: 60,
                message: "The maximum length is 60 characters",
              },
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "The email is invalid",
              },
            }}
            name="email"
            control={control}
            render={({ field }) => (
              <AuthInput
                field={field}
                label="Email Address"
                placeholder="Enter a valid email address"
                error={errors.email}
              />
            )}
          />
          <Controller
            rules={{
              required: { value: true, message: "The password is required" },
              minLength: {
                value: 8,
                message: "The minimume length is 8 characters",
              },
            }}
            name="password"
            control={control}
            render={({ field }) => (
              <AuthInput
                field={field}
                label="Password"
                placeholder="Enter your password"
                error={errors.password}
              />
            )}
          />
          <Controller
            rules={{
              required: {
                value: true,
                message: "The password confirmation is required",
              },
              validate: (value) =>
                value === password.current ||
                "The password confirmation doesn't match",
            }}
            name="passwordc"
            control={control}
            render={({ field }) => (
              <AuthInput
                field={field}
                label="Password Confirmation"
                placeholder="Confirm your password"
                error={errors.passwordc}
              />
            )}
          />
          <AuthBtn disabled={loading}>SIGN UP</AuthBtn>
          <Link href="/">
            <FormLink>
              Already have an account ? <Span>SIGN IN</Span>
            </FormLink>
          </Link>
        </Form>
        <Side>
          <SideImage src={SideImg} layout="fill" />
        </Side>
      </Card>
    </Container>
  );
}

export default SignUp;
