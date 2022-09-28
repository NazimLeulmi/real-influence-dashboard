import * as React from "react";
import { Card, styled } from "@mui/material";

const FormWrapper = styled(Card)(({ theme }) => ({
  width: "85%",
  height: "85%",
  maxWidth: 1000,
  backgroundColor: "rgba(255,255,255,.1)",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
}));

function Wrapper({ children }) {
  return <FormWrapper>{children}</FormWrapper>;
}

export default Wrapper;
