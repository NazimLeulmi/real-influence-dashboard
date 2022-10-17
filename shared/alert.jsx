import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AlertDialog({ open, setOpen, deleteFun }) {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Do you want to delete this admin account ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This is an alert dialog to avoid accidental actions
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>DECLINE</Button>
        <Button onClick={deleteFun} autoFocus>
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;
