import { TextField, styled } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

const Input = styled(TextField)(({ theme }) => ({
  width: 400,
  marginBottom: 16,
  borderRadius: 30,
}));

function AuthInput({ field, label, placeholder, error }) {
  return (
    <Input
      variant="outlined"
      label={label}
      placeholder={placeholder}
      error={error ? true : false}
      helperText={error ? error.message : null}
      InputProps={{
        autoComplete: "new-password",
        endAdornment: (
          <InputAdornment position="end">
            {label === "Password" || label === "Password Confirmation" ? (
              <LockIcon sx={{ color: "rgba(0,0,0,.3)" }} />
            ) : null}
            {label === "Email Address" ? (
              <EmailIcon sx={{ color: "rgba(0,0,0,.3)" }} />
            ) : null}
          </InputAdornment>
        ),
      }}
      type={
        label === "Password" || label === "Password Confirmation"
          ? "password"
          : null
      }
      {...field}
    />
  );
}

export default AuthInput;