import { Typography, styled, IconButton, Paper, alpha } from "@mui/material";
import React from "react";

const Container = styled(Paper)(({ theme, color }) => ({
  background: alpha(color, 0.75),
  height: 230,
  margin: 15,
  borderRadius: 15,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));
const Circle = styled(Paper)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,.05)",
  marginBottom: 35,
}));
const Counter = styled(Typography)(({ theme }) => ({
  marginBottom: 5,
  fontWeight: "bold",
  fontSize: 32,
}));
const Text = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  fontWeight: 400,
}));

function CounterCard() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  return (
    <Container color={color} elevation={1}>
      <Circle>{icon}</Circle>
      <Counter variant="h3">{counter}</Counter>
      <Text>{text}</Text>
    </Container>
  );
}

export default CounterCard;
