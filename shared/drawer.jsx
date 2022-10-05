import {
  SwipeableDrawer,
  Typography,
  styled,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const MyDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  minWidth: 300,
  ".MuiDrawer-paper": {
    width: 300,
  },
}));

function SideNav({ openDrawer, setOpenDrawer }) {
  return (
    <MyDrawer
      anchor="left"
      style={{ width: 400 }}
      onClose={() => setOpenDrawer(false)}
      onOpen={() => setOpenDrawer(true)}
      open={openDrawer}
    >
      <Typography variant="h4">John Doe</Typography>
    </MyDrawer>
  );
}

export default SideNav;
