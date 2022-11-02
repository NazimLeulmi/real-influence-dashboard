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
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import Bear from "../assets/bear.png";
import Panda from "../assets/panda.png";

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
  width: "100%",
  background: theme.palette.primary.light,
  display: "flex",
  alignSelf: "center",
  padding: "50px 15px",
  alignItems: "center",
  marginBottom: 10,
  color: "white",
}));
const Link = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
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
        <img src={admin.super ? Bear : Panda} height={60} width={60} />
        <Typography variant="h5" style={{ marginLeft: 10 }}>
          {admin.username}
        </Typography>
      </Header>
      <List>
        <Link
          to="/dashboard"
          style={({ isActive }) =>
            isActive ? { color: "blue" } : { color: "black" }
          }
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard fontSize="medium" />
              </ListItemIcon>

              <ListItemText>Dashboard</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to="/influencers"
          style={({ isActive }) =>
            isActive ? { color: "blue" } : { color: "black" }
          }
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Face2 fontSize="medium" />
              </ListItemIcon>

              <ListItemText>Influencers</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to="/users"
          style={({ isActive }) =>
            isActive ? { color: "blue" } : { color: "black" }
          }
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <People fontSize="medium" />
              </ListItemIcon>

              <ListItemText>Users</ListItemText>
            </ListItemButton>
          </ListItem>
        </Link>
        {admin.super && (
          <>
            <Link
              to="/admins"
              style={({ isActive }) =>
                isActive ? { color: "blue" } : { color: "black" }
              }
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AdminPanelSettings fontSize="medium" />
                  </ListItemIcon>

                  <ListItemText>Admins</ListItemText>
                </ListItemButton>
              </ListItem>
            </Link>
            <Link
              to="/admin-form"
              style={({ isActive }) =>
                isActive ? { color: "blue" } : { color: "black" }
              }
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PersonAdd fontSize="medium" />
                  </ListItemIcon>

                  <ListItemText>Add Admin</ListItemText>
                </ListItemButton>
              </ListItem>
            </Link>
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
