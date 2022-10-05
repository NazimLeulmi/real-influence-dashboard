import React from "react";
import { useForm, Controller } from "react-hook-form";
import AuthInput from "../auth/input";
import AuthBtn from "../auth/button";
import Image from "next/image";
import LogoImg from "../public/logo.png";
import { useRouter } from "next/router";
import axios from "axios";
import validation from "../auth/validation";
import Wrapper from "../auth/wrapper";
import FormHeader from "../auth/header";
import FormLink from "../auth/link";
import { Logo, Form, Side } from ".";
import Model from "../public/model.jpg";

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
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Logo>
          <Image src={LogoImg} layout="fill" />
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
        <AuthBtn disabled={loading}>REGISTER</AuthBtn>
        <FormLink href="/" />
      </Form>
      <Side>
        <Image src={Model} layout="fill" style={{ borderRadius: 20 }} />
      </Side>
    </Wrapper>
  );
}

export default SignUp;
