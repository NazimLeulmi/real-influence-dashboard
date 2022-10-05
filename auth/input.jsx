import { TextField, styled, IconButton } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Input = styled(TextField)(({ theme }) => ({
  marginBottom: 16,
  borderRadius: 30,
  width: "100%",
  maxWidth: 400,
}));

function AuthInput({
  field,
  label,
  placeholder,
  error,
  handleMouseDownPassword,
  togglePasswordVisiblity,
  showPassword,
  type,
}) {
  return (
    <Input
      variant="filled"
      label={label}
      placeholder={placeholder}
      error={error ? true : false}
      helperText={error ? error.message : null}
      InputProps={{
        autoComplete: "new-password",
        endAdornment:
          label === "Password" || label === "Password Confirmation" ? (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisiblity}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
      }}
      type={type}
      {...field}
    />
  );
}

export default AuthInput;
