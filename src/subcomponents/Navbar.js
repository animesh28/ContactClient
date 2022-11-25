import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useGetRoleByIDQuery } from "../store/user/serverApiSlice";
import AccountCircle from "./AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;

const contactActions = [
  {
    title: "Constant Contact",
    perm: "get_contact",
    icon: <PermContactCalendarIcon />,
    redirect: "/list",
  },
];

const settings = [
  {
    title: "Settings",
    perm: "admin_settings",
    icon: <SettingsIcon />,
    redirect: "/settings",
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {
  const { auth } = useAuth();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { data, isLoading, isError, error } = useGetRoleByIDQuery(auth.role, {
    skip: !auth,
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Contact Manager
          </Typography>
          <AccountCircle />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        {auth?.email ? (
          isLoading ? (
            <>Loading Options</>
          ) : isError ? (
            <>Error Fetching Constant Contact {error}</>
          ) : data ? (
            <>
              <List>
                {contactActions.map((item, index) =>
                  data.permissions.find(
                    (per) => item.perm === per.perm_name
                  ) ? (
                    <ListItem
                      key={item.title}
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      <Link to={item.redirect}>
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.title}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ) : null
                )}
              </List>
            </>
          ) : null
        ) : null}

        {auth?.email ? (
          isLoading ? (
            <>Loading Options</>
          ) : isError ? (
            <>Error Fetching Constant Contact {error}</>
          ) : data ? (
            <>
              <List sx={{ marginTop: "auto" }}>
                {settings.map((item, index) =>
                  data.permissions.find(
                    (per) => item.perm === per.perm_name
                  ) ? (
                    <ListItem
                      key={item.title}
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      <Link to={item.redirect}>
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : "auto",
                              justifyContent: "center",
                            }}
                          >
                            {item.icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={item.title}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ) : null
                )}
              </List>
            </>
          ) : null
        ) : null}
      </Drawer>
    </Box>
  );
}
