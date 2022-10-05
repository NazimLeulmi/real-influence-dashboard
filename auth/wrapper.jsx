import React from "react";
import { styled } from "@mui/material";

const Container = styled("div")(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  position: "relative",
  backgroundColor: theme.palette.background.main,
  "@media screen and (min-width: 900px)": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    justifyContent: "center",
  },
  "@media screen and (min-width: 1200px)": {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Wrapper({ children }) {
  return <Container>{children}</Container>;
}

export default Wrapper;
