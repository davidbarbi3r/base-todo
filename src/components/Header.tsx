import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Auth, signOut, getAuth } from "firebase/auth";
import {AppBar, Box, Toolbar, Typography, Button, Menu, MenuItem} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import * as XLSX from "xlsx";
import { excelCRUD } from "../controllers/CRUDcontrollers";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet);
          console.log(json);
          excelCRUD.post(json);
        }
      };
      reader.readAsBinaryString(file);
    };
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
          <Button variant="contained" color="warning" component="label">
            UPLOAD FILE
            <input id="upload-excel" hidden accept=".xlsx" multiple type="file" onChange={(e) => {
              handleFileChange(e);
             }}/>
          </Button>
          <Button variant="contained" color="warning" onClick={() => navigate("/")} sx={{ml:2}}>
            EXPORT FILE
          </Button>
          <Button color="inherit" onClick={() => handleLogout(auth, user)}>
            {user ? <PersonOffOutlinedIcon /> : <PermIdentityOutlinedIcon />}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
