import * as React from "react";
import Drawer from "./shared/drawer";
import { Button, Chip, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialog from "./shared/alert";
import LoadingImage from "./assets/loading.svg";
import { LoadingContainer } from "./signin";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import fetchInfluencers from "./requests/fetchInfluencers";
import fetchAdmin from "./requests/fetchAdmin";
import toggleStatus from "./requests/toggleStatus";
import deleteInfluencer from "./requests/deleteInfluencer";
import { useNavigate } from "react-router-dom";

export default function Influencers() {
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [open, setOpen] = React.useState(false); // alert dialog state
  const [revoke, setRevoke] = React.useState(false); // alert dialog state
  const [selected, setSelected] = React.useState(null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { data: influencers, isLoading } = useQuery(
    ["influencers"],
    fetchInfluencers
  );
  const { data: admin, isLoading: Loading } = useQuery(["admin"], fetchAdmin);
  const mutation = useMutation(toggleStatus, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["influencers"]);
    },
  });
  const deleteMutation = useMutation(deleteInfluencer, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["influencers"]);
    },
  });

  const columns = [
    {
      field: "profileImg",
      headerName: "Picture",
      sortable: false,
      width: 65,
      renderCell: (params) => {
        return (
          <img
            src={"https://realinfluence.io/" + params.row.profileImg}
            width={55}
            height={55}
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
            onClick={() => triggerStatusAlert(params.row)}
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
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            color="error"
            onClick={() => triggerDeleteAlert(params.row)}
          >
            DELETE
          </Button>
        );
      },
    },
  ];

  function triggerStatusAlert(user) {
    setRevoke(true);
    setSelected(user);
    setOpen(true);
  }
  function triggerDeleteAlert(user) {
    setRevoke(false);
    setSelected(user);
    setOpen(true);
  }

  async function removeInfluencer() {
    console.log(selected);
    deleteMutation.mutate(selected._id);
    setOpen(false);
  }

  async function updateStatus() {
    mutation.mutate(selected._id);
    setOpen(false);
  }

  if (isLoading || Loading) {
    return (
      <LoadingContainer>
        <img src={LoadingImage} />
      </LoadingContainer>
    );
  }

  if (!admin || !Influencers) return navigate("/");

  return (
    <Box sx={{ display: "flex" }}>
      <AlertDialog
        open={open}
        setOpen={setOpen}
        deleteFun={revoke ? updateStatus : removeInfluencer}
      />
      <Drawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        admin={admin}
      />
      <Box sx={{ width: "100%" }}>
        <div style={{ height: "100%", width: "100%" }}>
          <DataGrid
            rows={influencers}
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
