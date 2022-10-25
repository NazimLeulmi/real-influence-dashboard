import * as React from "react";
import Drawer from "./shared/drawer";
import { Button, Chip, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdminPanelSettings, Person2 } from "@mui/icons-material";
import AlertDialog from "./shared/alert";
import Rookie from "./assets/rookie.png";
import Super from "./assets/super.png";
import LoadingImage from "./assets/loading.svg";
import { LoadingContainer } from "./signin";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import fetchAdmin from "./requests/fetchAdmin";
import fetchAdmins from "./requests/fetchAdmins";
import deleteAdmin from "./requests/deleteAdmin";
import { useNavigate } from "react-router-dom";

export default function Admins() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [open, setOpen] = React.useState(false); // alert dialog state
  const [selected, setSelected] = React.useState(null);
  const navigate = useNavigate();

  // React Query //
  const queryClient = useQueryClient();
  const { data: admins, isLoading } = useQuery(["admins"], fetchAdmins);
  const { data: admin, isLoading: Loading } = useQuery(["admin"], fetchAdmin);
  const deleteMutation = useMutation(deleteAdmin, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['admins'])
    },
  })
  const columns = [
    {
      field: "image",
      headerName: "Emblem",
      sortable: false,
      width: 65,
      renderCell: (params) => {
        return (
          <img
            src={params.row.super ? Super : Rookie}
            width={50}
            height={50}
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

  async function removeAdmin() {
    console.log(selected);
    deleteMutation.mutate(selected._id);
    setOpen(false);
  }

  if (isLoading || Loading) {
    return (
      <LoadingContainer>
        <img src={LoadingImage} />
      </LoadingContainer>
    )
  }

  console.log(admin, admins)
  if (!admin || !admins) return navigate("/");

  return (
    <Box sx={{ display: "flex" }}>
      <AlertDialog open={open} setOpen={setOpen} deleteFun={removeAdmin} />
      <Drawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        admin={admin}
      />
      <Box sx={{ width: "100%" }}>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={admins}
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
