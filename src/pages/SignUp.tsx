import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import { auth } from "../config/config";
import logging from "../config/logging";
import { AuthError, User } from "firebase/auth";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

interface Props {
  user: User | null;
}

export default function Login({ user }: Props) {
  const [errorMsg, setErrorMsg] = useState<boolean>(false);
  const navigate = useNavigate()
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newUser = {
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
    };
    try {
      auth
        .createUserWithEmailAndPassword(
          newUser.email ? newUser.email : "",
          newUser.password ? newUser.password : ""
        )
        .then(async (userAuth) => {
          await userAuth.user?.updateProfile({
            displayName: data.get("pseudo")?.toString(),
          }).then(() => navigate("/"))
          logging.info(
            `Hello ${userAuth.user?.displayName}, you're Successfuly registered`
          );
        });
    } catch {
      (error: AuthError) => {
        setErrorMsg(true);
        logging.error(error.name);
      };
    }
  };
  console.log(errorMsg)

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
            <Typography variant="h4" gutterBottom>
              Sign Up
            </Typography>
            <Typography color="textSecondary" align="center">
              Welcome to ToEisenhoDo, let's create an account!
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="pseudo"
                    required
                    fullWidth
                    id="pseudo"
                    label="Pseudo"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
                {errorMsg ? <Typography>"Email or Password incorect"</Typography> : ""}
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
