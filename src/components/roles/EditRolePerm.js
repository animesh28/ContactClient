import React, { useEffect, useState } from "react";
import {
  useAddPermissionToRoleMutation,
  useGetPermissionsQuery,
  useGetRolesQuery,
} from "../../store/user/serverApiSlice";
import {
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Box,
  Chip,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import "./EditRolePermissions.styles.scss";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const current = new Map();
const all = new Map();

function EditRolePerm() {
  const location = useLocation();
  const { auth } = useAuth();
  const [addPermissionToRole] = useAddPermissionToRoleMutation();

  const {
    data: allRolesData,
    isSuccess: allRolesSuccess,
    isLoading: allRolesLoading,
    isError: allRolesIsError,
    error: allRolesError,
  } = useGetRolesQuery();
  const {
    data: permissionData,
    isSuccess: permissionSuccess,
    isLoading: permissionLoading,
    isError: permissionIsError,
    error: permissionError,
  } = useGetPermissionsQuery();
  let content1;
  if (allRolesLoading) {
    content1 = "Roles Loading";
  } else if (allRolesIsError) {
    content1 = "Error Fetching Roles " + allRolesError;
  }

  let content2;
  if (permissionLoading) {
    content2 = "Roles Loading";
  } else if (permissionIsError) {
    content2 = "Error Fetching Roles " + permissionError;
  }

  let initialRoleID = auth?.role;
  if (location.hash) {
    const code = location.hash.substring(1);
    const params = new URLSearchParams(code);
    initialRoleID = Number(params.get("roleID"));
  }
  const handleRoleChange = (event) => {
    setRoleID(event.target.value);
    setSelectedPerm(current.get(event.target.value));
  };

  const [allPerm, setallPerm] = useState([]);
  const [selectedPerm, setSelectedPerm] = useState();

  const [roleID, setRoleID] = useState(initialRoleID);
  const [dataMapped, setDataMapped] = useState(false);
  useEffect(() => {
    if (permissionSuccess && allRolesSuccess) {
      allRolesData.forEach((role) => {
        const key = role.id;
        const value = role.permissions.map((perm) => perm.id);
        current.set(key, value);
      });

      permissionData.forEach((perm) => {
        const key = perm.id;
        const value = {
          perm_name: perm.perm_name,
          perm_description: perm.perm_description,
        };
        all.set(key, value);
      });

      let arr = [];
      for (let [key] of all) {
        arr.push(key);
      }
      setallPerm(arr);
      setSelectedPerm(current.get(roleID));
      setDataMapped(true);
    }
  }, [allRolesData, permissionData]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedPerm(value);
  };

  const hadlePostAction = () => {
    addPermissionToRole({ id: roleID, data: JSON.stringify(selectedPerm) });
  };

  const [infoOpen, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return dataMapped ? (
    <div className="edit-role-permissions_container">
      <TextField
        className="edit-role-permissions_form-input"
        select
        value={roleID}
        label="Select Role"
        onChange={handleRoleChange}
      >
        {allRolesData.map((role, i) => {
          return (
            <MenuItem
              key={`${role.role_description + role.id}selectItem`}
              value={role.id}
            >
              {role.role_description}
            </MenuItem>
          );
        })}
      </TextField>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="demo-multiple-checkbox-label">
          Select Permissions
        </InputLabel>
        <Select
          multiple
          value={selectedPerm}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Select Permissions"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((permId) => (
                <Chip key={permId} label={all.get(permId).perm_name} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {console.log("in box", all)}
          {allPerm.map((perm, i) => (
            <MenuItem key={`allPermMenuItemEditRole${perm}${i}`} value={perm}>
              <Checkbox checked={selectedPerm.includes(perm)} />
              <ListItemText primary={all.get(perm).perm_description} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={hadlePostAction}
        variant="contained"
        className="edit-role-permissions_form-btn"
      >
        Update Permissions
      </Button>
      <Snackbar
        open={infoOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          Please include "Get Role" Permission in every role
        </Alert>
      </Snackbar>
    </div>
  ) : (
    <>
      `${content1}
      <br />${content2}`
    </>
  );
}

export default EditRolePerm;
