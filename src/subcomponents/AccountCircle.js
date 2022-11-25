import React from "react";
import {
  Box,
  Avatar,
  Menu,
  ListItemIcon,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Logout from "@mui/icons-material/Logout";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function AccountCircle() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
    sessionStorage.removeItem("user");
    setAuth({});
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginLeft: "auto",
        }}
      >
        <Tooltip title="Account Menu">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {auth?.email ? (
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        ) : (
          <MenuItem onClick={handleLogin}>
            <ListItemIcon>
              <VpnKeyIcon fontSize="small" />
            </ListItemIcon>
            Login
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default AccountCircle;
