import { styled, Typography } from "@mui/material";

const Header = styled(Typography)(() => ({
  fontWeight: 400,
  fontSize: 22,
  margin: 0,
  marginBottom: 5,
  maxWidth: 400,
}));
const SubHeader = styled(Typography)(() => ({
  fontWeight: 200,
  fontSize: 16,
  margin: 0,
  marginBottom: 50,
  maxWidth: 400,
}));

function FormHeader({ href }) {
  return (
    <>
      <Header variant="h3" as="h1">
        {href === "/" ? "Sign in to the dashboard" : "Create your account"}
      </Header>
      <SubHeader variant="h5" as="h2">
        Enter your credentials bellow
      </SubHeader>
    </>
  );
}

export default FormHeader;
