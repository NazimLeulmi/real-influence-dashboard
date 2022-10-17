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
import axios from "axios";
import { useRouter } from "next/router";

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

function SideNav({ openDrawer, setOpenDrawer, admin }) {
  const router = useRouter();
  const path = router.pathname;
  console.log(path);

  async function logout() {
    const response = await axios.post(
      "https://localhost:8888/signout",
      {},
      {
        withCredentials: true,
      }
    );
    let data = response.data;
    if (data.success) router.push("/");
  }
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
          {admin.username}
        </Typography>
      </Header>
      <List>
        <ListItem
          disablePadding
          sx={{ background: path === "/dashboard" ? "rgba(0,0,0,.075)" : null }}
        >
          <ListItemButton>
            <ListItemIcon>
              <Dashboard fontSize="medium" />
            </ListItemIcon>
            <Link href="/dashboard">
              <ListItemText>Dashboard</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{
            background: path === "/influencers" ? "rgba(0,0,0,.075)" : null,
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <Face2 fontSize="medium" />
            </ListItemIcon>
            <Link href="/influencers">
              <ListItemText>Influencers</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem
          disablePadding
          sx={{ background: path === "/users" ? "rgba(0,0,0,.075)" : null }}
        >
          <ListItemButton>
            <ListItemIcon>
              <People fontSize="medium" />
            </ListItemIcon>
            <Link href="/users">
              <ListItemText>Users</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
        {admin.super && (
          <>
            <ListItem
              disablePadding
              sx={{
                background: path === "/admins" ? "rgba(0,0,0,.075)" : null,
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <AdminPanelSettings fontSize="medium" />
                </ListItemIcon>
                <Link href="/admins">
                  <ListItemText>Admins</ListItemText>
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={{
                background: path === "/add-admin" ? "rgba(0,0,0,.075)" : null,
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  <PersonAdd fontSize="medium" />
                </ListItemIcon>
                <Link href="/add-admin">
                  <ListItemText>Add Admin</ListItemText>
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <ListItem
        disablePadding
        sx={{ marginTop: "auto", marginBottom: "20px" }}
        onClick={logout}
      >
        <ListItemButton>
          <ListItemIcon>
            <Logout fontSize="medium" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </ListItemButton>
      </ListItem>
    </MyDrawer>
  );
}

export default SideNav;
