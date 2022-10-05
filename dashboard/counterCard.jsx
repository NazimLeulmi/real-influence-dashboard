import { Typography, styled, IconButton, Paper, alpha } from "@mui/material";
import React from "react";
// import MenuIcon from "@mui/icons-material/Menu";

const Container = styled(Paper)(({ theme, color }) => ({
  background: alpha(color, 0.45),
  height: 230,
  margin: 10,
  borderRadius: 10,
  display: "flex",
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
}));
const Counter = styled(Typography)(({ theme }) => ({}));
const Text = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 400,
}));

function CounterCard({ color, icon, counter }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  return (
    <Container color={color} elevation={1}>
      <Circle>{icon}</Circle>
      <Counter variant="h3">{counter}</Counter>
    </Container>
  );
}

export default CounterCard;
