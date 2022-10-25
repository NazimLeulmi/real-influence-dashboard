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
import React from "react";
import {
  Face2,
  Dashboard,
  People,
  AdminPanelSettings,
  Logout,
  PersonAdd,
} from "@mui/icons-material";
import Logo from "../assets/hacker.png";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";

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
const Link = styled(NavLink)(({ theme }) => ({
  textDecoration: "none"
}));




function SideNav({ openDrawer, setOpenDrawer, admin }) {
  const navigate = useNavigate();

  async function logout() {
    const response = await axios.post(
      "https://realinfluence.io/signout",
      {},
      {
        withCredentials: true,
      }
    );
    let data = response.data;
    if (data.success) return navigate("/");
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
        <img src={Logo} height={45} width={45} />
        <Typography variant="h5" style={{ marginLeft: 10 }}>
          {admin.username}
        </Typography>
      </Header>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Dashboard fontSize="medium" />
            </ListItemIcon>
            <Link to="/dashboard" style={({ isActive }) =>
              isActive ? { color: "blue" } : { color: "black" }
            }>
              <ListItemText>Dashboard</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Face2 fontSize="medium" />
            </ListItemIcon>
            <Link to="/influencers" style={({ isActive }) =>
              isActive ? { color: "blue" } : { color: "black" }
            }>
              <ListItemText>Influencers</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <People fontSize="medium" />
            </ListItemIcon>
            <Link to="/users" style={({ isActive }) =>
              isActive ? { color: "blue" } : { color: "black" }
            }>
              <ListItemText>Users</ListItemText>
            </Link>
          </ListItemButton>
        </ListItem>
        {admin.super && (
          <>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AdminPanelSettings fontSize="medium" />
                </ListItemIcon>
                <Link to="/admins" style={({ isActive }) =>
                  isActive ? { color: "blue" } : { color: "black" }
                } >
                  <ListItemText>Admins</ListItemText>
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonAdd fontSize="medium" />
                </ListItemIcon>
                <Link to="/admin-form" style={({ isActive }) =>
                  isActive ? { color: "blue" } : { color: "black" }
                }>
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
