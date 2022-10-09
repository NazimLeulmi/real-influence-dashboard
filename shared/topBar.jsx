import Avatar from "../public/hacker.png";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import { styled, IconButton } from "@mui/material";
import React from "react";

const Bar = styled("div")(({ theme }) => ({
  width: "100vw",
  height: 70,
  backgroundColor: "rgba(0,0,0,.15)",
  display: "flex",
  padding: 10,
  justifyContent: "space-between",
}));

function TopBar({ setOpenDrawer }) {
  return (
    <Bar>
      <IconButton onClick={() => setOpenDrawer(true)}>
        <MenuIcon fontSize="large" />
      </IconButton>
      <Image src={Avatar} height={45} width={45} />
    </Bar>
  );
}

export default TopBar;
