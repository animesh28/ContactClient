import React from "react";
import "./Settings.styles.scss";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddModeratorIcon from "@mui/icons-material/AddModerator";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import { useGetRoleByIDQuery } from "../store/user/serverApiSlice";

const roleActions = [
  {
    title: "Manage Roles",
    perm: "role_get_all",
    icon: <SafetyCheckIcon fontSize="large" />,
    redirect: "/roles",
  },

  {
    title: "Add Role",
    perm: "role_add",
    icon: <AddModeratorIcon fontSize="large" />,
    redirect: "/add-role",
  },
];

const userActions = [
  {
    title: "Manage Users",
    perm: "user_get_all",
    icon: <PeopleAltIcon fontSize="large" />,
    redirect: "/getUsers",
  },

  {
    title: "Add Users",
    perm: "user_add",
    icon: <PersonAddIcon fontSize="large" />,
    redirect: "/addUser",
  },
];

function Settings() {
  const { auth } = useAuth();
  const { data, isLoading, isError, error } = useGetRoleByIDQuery(auth.role, {
    skip: !auth,
  });
  return (
    <div className="settings">
      <List>
        {auth?.email ? (
          isLoading ? (
            <>Loading Options</>
          ) : isError ? (
            <>Error Fetching Roles {error}</>
          ) : data ? (
            <>
              {roleActions.map((item, index) =>
                data.permissions.find((per) => {
                  return item.perm === per.perm_name;
                }) ? (
                  <ListItem
                    key={item.title + "settingsPage" + index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <Link to={item.redirect}>
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ) : null
              )}
            </>
          ) : null
        ) : null}
        {auth?.email ? (
          isLoading ? (
            <>Loading Options</>
          ) : isError ? (
            <>Error Fetching Roles {error}</>
          ) : data ? (
            <>
              {userActions.map((item, index) =>
                data.permissions.find((per) => {
                  return item.perm === per.perm_name;
                }) ? (
                  <ListItem
                    key={item.title + "settingsPage" + index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <Link to={item.redirect}>
                      <ListItemButton>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ) : null
              )}
            </>
          ) : null
        ) : null}
      </List>
    </div>
  );
}

export default Settings;
