import * as React from "react";
import { Card, styled, Typography } from "@mui/material";
import Image from "next/image";
import Logo from "../public/logo.svg";

const Container = styled(Card)(({ theme }) => ({
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(255,255,255,.1)",
  display: "flex",
  flexDirection: "column",
  padding: 30,
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const Brand = styled(Typography)(({ theme }) => ({
  color: "white",
  marginLeft: 15,
}));

function FormSide({ children }) {
  return (
    <Container>
      <Header>
        <Image src={Logo} />
        <Brand variant="h4" component="h1">
          HRMS
        </Brand>
      </Header>
    </Container>
  );
}

export default FormSide;
