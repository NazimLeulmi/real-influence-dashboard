import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import AuthInput from "./auth/input";
import AuthBtn from "./auth/button";
import { styled, Checkbox, FormControlLabel, Typography } from "@mui/material";
import LogoImg from "./assets/hacker.png";
import Model from "./assets/model.png";
import axios from "axios";
import validation from "./auth/validation";
import Wrapper from "./auth/wrapper";
import FormHeader from "./auth/header";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { useQuery } from "@tanstack/react-query";
import fetchAdmin from "./requests/fetchAdmin";
import LoadingImage from "./assets/loading.svg";

export const Logo = styled("img")(() => ({
  width: 100,
  height: 100,
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
export const SideImage = styled("img")(({ theme }) => ({
  height: "100%",
  width: "100%",
  borderRadius: 20,
}));
export const LoadingContainer = styled("div")(({ theme }) => ({
  height: "100vh",
  width: "100vw",
  background: "whitesmoke",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
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
  const { isLoading, data } = useQuery(["admin"], fetchAdmin);

  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

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
        "https://realinfluence.io/admins/signin",
        formData
      );
      let data = await response.data;
      console.log(data);
      if (data.success === true) {
        console.log("Signed in");
        return navigate("/dashboard");
      }
      setError("password", {
        type: "server",
        message: data.error,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) {
    return (
      <LoadingContainer>
        <img src={LoadingImage} />
      </LoadingContainer>
    )
  }

  if (data) return navigate("/dashboard");

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Logo src={LogoImg} />
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
      </Form>
      <Side>
        <SideImage src={Model} />
      </Side>
    </Wrapper>
  );
}

export default SignIn;
