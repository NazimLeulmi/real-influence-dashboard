import * as React from "react";
import TopBar from "../shared/topBar";
import Drawer from "../shared/drawer";
import axios from "axios";
import { Button, Chip, Box, calc } from "@mui/material";
import { DataGrid, GridCell } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";

export default function Influencers({ influencers }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [inf, setInf] = React.useState(influencers);
  const columns = [
    {
      field: "profileImg",
      headerName: "Picture",
      sortable: false,
      width: 65,
      renderCell: (params) => {
        return (
          <Image
            src={"http://localhost:8888/" + params.row.profileImg}
            width={55}
            height={55}
            layout="intrinsic"
            style={{ borderRadius: 30 }}
          />
        );
      },
    },
    {
      field: "_id",
      headerName: "Influencer Id",
      width: 120,
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email Address",
      width: 175,
      headerAlign: "center",
    },
    {
      field: "approved",
      headerName: "Status",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Chip
            label={params.row.approved ? "APPROVED" : "PENDING"}
            color={params.row.approved ? "primary" : "secondary"}
            sx={{ width: 120 }}
            icon={params.row.approved ? <CheckCircleIcon /> : <InfoIcon />}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      headerAlign: "center",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            startIcon={
              params.row.approved ? <RemoveCircleIcon /> : <CheckCircleIcon />
            }
            sx={{
              background: params.row.approved ? "orange" : "primary",
            }}
            onClick={() => updateStatus(params.row)}
          >
            {params.row.approved ? "REVOKE" : "APPROVE"}
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      headerAlign: "center",
      width: 120,
      align: "center",
      renderCell: (params) => {
        return (
          <Button variant="contained" startIcon={<DeleteIcon />} color="error">
            DELETE
          </Button>
        );
      },
    },
  ];
  async function updateStatus(user) {
    console.log("Updating Status", user);
    const route = user.approved ? "revoke" : "approve";
    let response = await axios.post(
      "http://localhost:8888/" + route,
      { id: user._id },
      { withCredentials: true }
    );
    let data = response.data;
    if (data.success === true) {
      const infCopy = await [...inf];
      const newCopy = await infCopy.map((obj) => {
        if (obj._id === data.user._id) {
          return data.user;
        } else {
          return obj;
        }
      });
      setInf(newCopy);
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <Box sx={{ width: "100%" }}>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={inf}
            columns={columns}
            rowHeight={60}
            getRowId={(row) => row._id}
            disableSelectionOnClick={true}
            sx={{
              "& .MuiDataGrid-cell:focus": {
                color: "primary.main",
                outline: 0,
              },
            }}
          />
        </div>
      </Box>
    </Box>
  );
}
export async function getServerSideProps({ req }) {
  let response = await axios.get("http://localhost:8888/influencers-table", {
    withCredentials: true,
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  let data = response.data;
  if (data.success === true) {
    return {
      props: { influencers: data.influencers },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
}
