import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import { User } from "firebase/auth";
import { auth } from "../config/config";
import logging from "../config/logging";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Typography } from "@mui/material";

const theme = createTheme();

interface Props {
  user: User | null;
}

export default function SignIn({ user }: Props) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const logUser = {
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
    };
    try {
      auth
        .signInWithEmailAndPassword(
          logUser.email ? logUser.email : "",
          logUser.password ? logUser.password : ""
        )
        .then(() => navigate("/"))
        .then(() => logging.info(`Hi, nice to see you back!`))
    } catch {
      (error: any) => {
        logging.error(error)
        setErrorMsg(error.message)
      }
    }
  };

  return (
    <>
      <Header user={user} />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>Login</Typography>
            <Typography color="textSecondary" align="center">Welcome to ToEisenhoDo, please login to enter in the app</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                <span>{errorMsg && errorMsg}</span>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
