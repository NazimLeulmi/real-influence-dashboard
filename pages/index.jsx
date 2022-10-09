import React from "react";
import { useForm, Controller } from "react-hook-form";
import AuthInput from "../auth/input";
import AuthBtn from "../auth/button";
import { styled, Checkbox, FormControlLabel, Typography } from "@mui/material";
import Image from "next/image";
import LogoImg from "../public/hacker.png";
import { useRouter } from "next/router";
import axios from "axios";
import validation from "../auth/validation";
import Wrapper from "../auth/wrapper";
import FormHeader from "../auth/header";
import Link from "next/link";
import FormLink from "../auth/link";
import Model from "../public/model.png";

export const Logo = styled("div")(() => ({
  width: 80,
  height: 80,
  position: "relative",
  marginBottom: 25,
}));

export const Form = styled("form")(() => ({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  zIndex: 2,
  padding: 20,
  flex: 1,
}));

const Footer = styled("div")(() => ({
  width: "100%",
  maxWidth: 400,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
}));
const LinkText = styled(Typography)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
  fontWeight: "bold",
}));

export const Side = styled("div")(({ theme }) => ({
  height: "95%",
  width: "95%",
  padding: 20,
  borderRadius: 20,
  display: "none",
  "@media screen and (min-width: 900px)": {
    display: "block",
  },
  position: "relative",
  backgroundColor: theme.palette.primary.main,
}));

function SignIn() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      checkbox: false,
    },
  });
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
      console.log(formData);
      setLoading(true);
      let response = await axios.post(
        "http://localhost:8888/admin-signin",
        formData,
        { withCredentials: true }
      );
      let data = await response.data;
      console.log(data);
      if (data.success === true) router.push("/dashboard");
      setError("password", {
        type: "server",
        message: data.error,
      });

      // setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Logo>
          <Image src={LogoImg} layout="fill" />
        </Logo>
        <FormHeader href="/" />
        {/* Email RHF input */}
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
        {/* Password RHF input */}
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
        <Footer>
          <Controller
            name="checkbox"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} />}
                label="Remember me"
              />
            )}
          />
          <Link href="#">
            <LinkText>Forget password?</LinkText>
          </Link>
        </Footer>
        <AuthBtn disabled={loading}>LOGIN</AuthBtn>
        <FormLink href="/signup" />
      </Form>
      <Side>
        <Image src={Model} layout="fill" style={{ borderRadius: 20 }} />
      </Side>
    </Wrapper>
  );
}

export default SignIn;
