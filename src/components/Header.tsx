import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Auth, signOut, getAuth } from "firebase/auth";
import {AppBar, Box, Toolbar, Typography, Button, Menu, MenuItem} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";

interface Props {
  user: User | null;
}

export default function Header({ user }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const auth = getAuth();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  const handleLogout = async (auth: Auth, user: User | null) => {
    if (user) {
      await signOut(auth).then(() => navigate("/login"));
    } else {
      navigate("/login");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={() => navigate("/")}>My todos</MenuItem>
            <MenuItem onClick={() => handleLogout(auth, user)}>
              {user ? "Logout" : "Login"}
            </MenuItem>
          </Menu>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems:"baseline" }}>
            <Typography variant="h6" component="div">
              Base Todo 
            </Typography>
            {user?.displayName && <Typography marginLeft={2} variant="body2">{user?.displayName}</Typography>}
          </Box>
          <Button color="inherit" onClick={() => handleLogout(auth, user)}>
            {user ? <PersonOffOutlinedIcon /> : <PermIdentityOutlinedIcon />}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
