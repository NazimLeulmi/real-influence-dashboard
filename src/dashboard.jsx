import { styled } from "@mui/material";
import Drawer from "./shared/drawer";
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import CounterCard from "./dashboard/counterCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PeopleIcon from "@mui/icons-material/People";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Face2Icon from "@mui/icons-material/Face2";
import BarChart from "./charts/barChart";
import LineChart from "./charts/lineChart";
import PieChart from "./charts/pieChart";
import UploadsData from "./data/uploads";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoadingContainer } from "./signin";
import LoadingImage from "./assets/loading.svg";
import { useQuery } from "@tanstack/react-query";
import fetchAdmin from "./requests/fetchAdmin";
import fetchStats from "./requests/fetchStats";

const Container = styled("main")(({ theme }) => ({
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
}));
const ChartContainer = styled(Box)(({ theme }) => ({
  height: 400,
  background: "rgba(0,0,0,.015)",
  margin: 15,
  padding: 15,
  borderRadius: 15,
}));
const Content = styled(Box)(({ theme }) => ({
  maxHeight: "100vh",
  overflow: "scroll",
}));

function Dashboard() {
  const navigate = useNavigate();
  const { data: admin, isLoading } = useQuery(["admin"], fetchAdmin);
  const { data: stats, isLoading: Loading } = useQuery(["stats"], fetchStats);
  console.log(stats, stats);

  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [data, setData] = React.useState({
    labels: UploadsData.map((data) => data.month),
    datasets: [
      {
        label: "Monthly Likes ( 2022 )",
        data: UploadsData.map((data) => data.likes),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 0.5,
      },
    ],
  });

  if (isLoading || Loading) {
    return (
      <LoadingContainer>
        <img src={LoadingImage} />
      </LoadingContainer>
    );
  }

  if (!admin) return navigate("/");

  return (
    <Container>
      <Drawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        admin={admin}
      />
      <Content>
        <Grid container spacing={0}>
          <Grid xs={6}>
            <CounterCard
              color="#D1E9FC"
              icon={<FavoriteIcon fontSize="medium" />}
              counter={stats.likes}
              text="Total Likes"
            />
          </Grid>
          <Grid xs={6}>
            <CounterCard
              color="#DDF2FF"
              icon={<CloudUploadIcon fontSize="medium" />}
              counter={stats.uploads}
              text="Total Uploads"
            />
          </Grid>
          <Grid xs={6}>
            <CounterCard
              color="#FFF7CD"
              icon={<Face2Icon fontSize="medium" />}
              counter={stats.influencers}
              text="Total Influencers"
            />
          </Grid>
          <Grid xs={6}>
            <CounterCard
              color="#FFE7D9"
              icon={<PeopleIcon fontSize="medium" />}
              counter={stats.users}
              text="Total Users"
            />
          </Grid>
          <Grid md={12}>
            <ChartContainer boxShadow={1}>
              <LineChart chartData={data} />
            </ChartContainer>
          </Grid>
          <Grid xs={6}>
            <ChartContainer boxShadow={1}>
              <BarChart />
            </ChartContainer>
          </Grid>
          <Grid xs={6}>
            <ChartContainer boxShadow={1}>
              <PieChart chartData={data} />
            </ChartContainer>
          </Grid>
        </Grid>
      </Content>
    </Container>
  );
}

export default Dashboard;
