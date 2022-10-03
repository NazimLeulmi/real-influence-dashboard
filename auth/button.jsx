import { Button, styled } from "@mui/material";
import { LoadingButton } from '@mui/lab';

const Btn = styled(LoadingButton)(({ theme }) => ({
  width: 400,
  marginBottom: 16,
  height: 50,
  color: "white",
  fontSize: 18,
  backgroundColor: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

function AuthBtn({ children, disabled }) {
  return (
    <Btn
      variant="contained"
      type="submit"
      color="secondary"
      disabled={disabled}
      loading={disabled}
    >
      {children}
    </Btn>
  );
}
export default AuthBtn;