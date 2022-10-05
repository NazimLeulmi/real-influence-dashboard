import { Typography, styled, IconButton, Paper } from "@mui/material";
import Drawer from "../shared/drawer";
import React from "react";
import Avatar from "../public/hacker.png";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Grid from "@mui/material/Unstable_Grid2";
import CounterCard from "../dashboard/counterCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Face2Icon from "@mui/icons-material/Face2";

const Container = styled("main")(({ theme }) => ({
  width: "100vw",
  minHeight: "100vh",
}));
const TopBar = styled("div")(({ theme }) => ({
  width: "100vw",
  height: 70,
  backgroundColor: "rgba(0,0,0,.15)",
  display: "flex",
  padding: 10,
  justifyContent: "space-between",
}));

function Dashboard() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  return (
    <Container>
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <TopBar>
        <IconButton onClick={() => setOpenDrawer(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>
        <Image src={Avatar} height={45} width={45} />
      </TopBar>
      <Grid container>
        <Grid xs={12}>
          <CounterCard
            color="#D1E9FC"
            icon={<FavoriteIcon color="primary" fontSize="large" />}
          />
        </Grid>
        <Grid xs={12}>
          <CounterCard
            color="#DDF2FF"
            icon={<CloudUploadIcon color="primary" fontSize="large" />}
          />
        </Grid>
        <Grid xs={12}>
          <CounterCard
            color="#FFF7CD"
            icon={<Face2Icon color="primary" fontSize="large" />}
          />
        </Grid>
        <Grid xs={12}>
          <CounterCard
            color="#FFE7D9"
            icon={<PeopleIcon color="primary" fontSize="large" />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
