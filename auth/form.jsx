import * as React from "react";
import { Card, styled, Typography } from "@mui/material";

const Container = styled("form")(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  padding: 20,
}));

function Form({ children }) {
  return <Container></Container>;
}

export default Form;
