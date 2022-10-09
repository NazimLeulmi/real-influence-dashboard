import * as React from "react";
import Drawer from "../shared/drawer";
import axios from "axios";
import { Button, Chip, Box, calc } from "@mui/material";
import { DataGrid, GridCell } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminPanelSettings, Person2 } from "@mui/icons-material";
import AlertDialog from "../shared/alert";
import Rookie from "../public/rookie.png";
import Super from "../public/super.png";
import Image from "next/image";

export default function Admins({ admins }) {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [open, setOpen] = React.useState(false); // alert dialog state
  const [adm, setAdmins] = React.useState(admins);
  const [selected, setSelected] = React.useState(null);
  const columns = [
    {
      field: "image",
      headerName: "Emblem",
      sortable: false,
      width: 65,
      renderCell: (params) => {
        return (
          <Image
            src={params.row.super ? Super : Rookie}
            width={50}
            height={50}
            layout="intrinsic"
            style={{ borderRadius: 25 }}
          />
        );
      },
    },
    {
      field: "_id",
      headerName: "Admin Id",
      width: 225,
      headerAlign: "center",
    },
    {
      field: "username",
      headerName: "Admin Name",
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
      field: "super",
      headerName: "Rank",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Chip
            label={params.row.super ? "SUPER" : "ROOKIE"}
            color={params.row.super ? "primary" : "secondary"}
            sx={{ width: 120 }}
            icon={params.row.super ? <AdminPanelSettings /> : <Person2 />}
          />
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
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            color="error"
            onClick={() => triggerDelete(params.row)}
            disabled={params.row.super}
          >
            DELETE
          </Button>
        );
      },
    },
  ];

  function triggerDelete(admin) {
    setSelected(admin);
    setOpen(true);
  }

  async function deleteAdmin() {
    let response = await axios.post(
      "http://localhost:8888/delete-admin",
      { id: selected._id },
      { withCredentials: true }
    );
    let data = response.data;
    if (data.success === true) {
      const adminsCopy = await [...adm];
      const newCopy = await adminsCopy.filter(
        (obj) => obj._id !== selected._id
      );
      setAdmins(newCopy);
      setOpen(false);
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <AlertDialog open={open} setOpen={setOpen} deleteAdmin={deleteAdmin} />
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <Box sx={{ width: "100%" }}>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={adm}
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
  let response = await axios.get("http://localhost:8888/admins", {
    withCredentials: true,
    headers: {
      Cookie: req.headers.cookie,
    },
  });
  let data = response.data;
  if (data.success === true) {
    return {
      props: { admins: data.admins },
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
