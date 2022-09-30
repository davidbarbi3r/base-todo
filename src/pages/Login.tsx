import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import { User } from "firebase/auth";
import { auth } from "../config/config";
import logging from "../config/logging";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Typography,
  Link,
  Grid,
  Box,
  Container,
  TextField,
  CssBaseline,
  Button,
  Modal,
} from "@mui/material";

const theme = createTheme();

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  user: User | null;
}

export default function SignIn({ user }: Props) {
  const [errorLoginMsg, setLoginErrorMsg] = useState<string | null>(null);
  const [errorResetMsg, setErrorResetMsg] = useState<string | null>(null)
  const [open, setOpen] = React.useState(false);
  const [resetEmail, setResetEmail] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const logUser = {
      email: data.get("email")?.toString(),
      password: data.get("password")?.toString(),
    };
    auth
      .signInWithEmailAndPassword(
        logUser.email ? logUser.email : "",
        logUser.password ? logUser.password : ""
      )
      .then(() => navigate("/"))
      .then(() => logging.info(`Hi, nice to see you back!`))
      .catch((error: any) => {
        logging.error(error);
        setLoginErrorMsg(error.message);
      });
  };

  const handleResetSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => console.log("Email Sent to : " + resetEmail))
      .catch((error) => {
        logging.error(error);
        setErrorResetMsg(error.message);
      });
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
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            <Typography color="textSecondary" align="center">
              Welcome to Base Todo, please login to enter in the app.
            </Typography>
            <Grid border="ButtonShadow">
            <Typography color="textSecondary" align="center">
              If you want to test the app without creating an account you can use : 
            </Typography>
            <Typography color="textSecondary" align="center">
              Email : test@test.com 
            </Typography>
            <Typography color="textSecondary" align="center">
              Password : password 
            </Typography>
            </Grid>
            <Box component="form" onSubmit={handleLoginSubmit} sx={{ mt: 1 }}>
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
                  <Link href="/#/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                <Typography variant="subtitle2">{errorLoginMsg && errorLoginMsg}</Typography>
              </Grid>
            </Box>
            <Grid container>
              <Grid item>
                <Link variant="body2" sx={{cursor: "pointer"}} onClick={handleOpen}>
                  {"Password forgotten ? Reset password"}
                </Link>
              </Grid>
            </Grid>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Reset Password
                </Typography>
                <Box
                  component="form"
                  sx={{ mt: 1 }}
                  onSubmit={handleResetSubmit}
                >
                  <TextField
                    onChange={(e) => setResetEmail(e.currentTarget.value)}
                    margin="normal"
                    required
                    fullWidth
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoFocus
                  />
                  <Button variant="contained" type="submit">
                    Send reset Email
                  </Button>
                  <Typography variant="subtitle2">{errorResetMsg && errorResetMsg}</Typography>
                </Box>
              </Box>
            </Modal>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}
