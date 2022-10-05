import { styled, Typography } from "@mui/material";
import Link from "next/link";

const LinkText = styled(Typography)(() => ({
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 300,
  textAlign: "center",
  maxWidth: 400,
  cursor: "pointer",
}));
const Span = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  display: "inline-block",
  color: theme.palette.primary.main,
  marginLeft: 5,
}));

function FormLink({ href }) {
  return (
    <Link href={href}>
      <LinkText>
        {href === "/" ? "Already have an account?" : "Don't have an account?"}
        <Span as="span">
          {href === "/signup" ? "Create an account" : "Sign in"}
        </Span>
      </LinkText>
    </Link>
  );
}

export default FormLink;
