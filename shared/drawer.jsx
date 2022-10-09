import {
  Drawer,
  Typography,
  styled,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Face2,
  Dashboard,
  People,
  AdminPanelSettings,
  Logout,
  PersonAdd,
} from "@mui/icons-material";
import Logo from "../public/hacker.png";

const MyDrawer = styled(Drawer)(({ theme }) => ({
  minWidth: 300,
  ".MuiDrawer-paper": {
    width: 300,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    position: "relative",
  },
}));
const Header = styled("div")(({ theme }) => ({
  width: 250,
  background: "rgba(0,0,0,.1)",
  display: "flex",
  padding: 20,
  borderRadius: 20,
  alignSelf: "center",
  margin: 20,
  alignItems: "center",
}));

function SideNav({ openDrawer, setOpenDrawer }) {
  return (
    <MyDrawer
      anchor="left"
      onClose={() => setOpenDrawer(false)}
      // onOpen={() => setOpenDrawer(true)}
      open={openDrawer}
      variant="permanent"
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <Header>
        <Image src={Logo} height={45} width={45} layout="intrinsic" />
        <Typography variant="h5" style={{ marginLeft: 10 }}>
          Nazim
        </Typography>
      </Header>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Dashboard fontSize="medium" />
            </ListItemIcon>
            <Link href="/dashboard">
              <ListItemText>Dashboard</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Face2 fontSize="medium" />
            </ListItemIcon>
            <Link href="/influencers">
              <ListItemText>Influencers</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <People fontSize="medium" />
            </ListItemIcon>
            <Link href="/users">
              <ListItemText>Users</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AdminPanelSettings fontSize="medium" />
            </ListItemIcon>
            <Link href="/admins">
              <ListItemText>Admins</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <PersonAdd fontSize="medium" />
            </ListItemIcon>
            <Link href="/add-admin">
              <ListItemText>Add Admin</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
      <ListItem disablePadding sx={{ marginTop: "auto", marginBottom: "20px" }}>
        <ListItemButton>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          <Link href="#">
            <ListItemText>Logout</ListItemText>
          </Link>
        </ListItemButton>
      </ListItem>
    </MyDrawer>
  );
}

export default SideNav;
