import React, { useEffect, useState } from "react";
import {
  useEditRoleMutation,
  useGetRolesQuery,
} from "../../store/user/serverApiSlice";
import { TextField, MenuItem, Button } from "@mui/material";
import "./EditRole.styles.scss";
import { errorHelper } from "../../helper/formik";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function EditRole() {
  const location = useLocation();
  const { auth } = useAuth();
  const [editRole] = useEditRoleMutation();
  const { data, isSuccess, isLoading, isError, error } = useGetRolesQuery();
  const [roleData, setRoleData] = useState();

  let initialRoleID = auth?.role;
  if (location.hash) {
    const code = location.hash.substring(1);
    const params = new URLSearchParams(code);
    initialRoleID = Number(params.get("roleID"));
  }
  const [roleID, setRoleID] = useState(initialRoleID);

  let content;
  if (isLoading) {
    content = "Loading";
  } else if (isError) {
    content = error;
  }
  const [autoFillData, setAutoFillData] = useState({
    role_name: "",
    role_description: "",
  });
  useEffect(() => {
    if (isSuccess) {
      setRoleData(
        data.map((role) => {
          if (role.id === roleID) {
            setAutoFillData({
              role_name: role.role_name,
              role_description: role.role_description,
            });
          }
          return {
            id: role.id,
            role_name: role.role_name,
            role_description: role.role_description,
          };
        })
      );
    }
  }, [data]);

  const handleRoleChange = (event) => {
    const id = event.target.value;
    roleData.forEach((role) => {
      if (role.id === event.target.value) {
        setAutoFillData({
          role_name: role.role_name,
          role_description: role.role_description,
        });
      }
    });
    setRoleID(id);
  };

  const updateRoleFormik = useFormik({
    initialValues: autoFillData,
    enableReinitialize: true,

    validationSchema: Yup.object({
      role_name: Yup.string().required("Sorry, Role Name is required"),

      role_description: Yup.string().required(
        "Sorry, Role Description is required"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      const roleServerData = { ...values, id: roleID };
      editRole(roleServerData);
      resetForm();
    },
  });

  const handleFormInputChange = (event) => {
    updateRoleFormik.handleChange(event);
    setAutoFillData({
      ...autoFillData,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateRoleAction = () => {
    editRole({ data: autoFillData, id: roleID });
  };
  return isSuccess && roleData ? (
    <div className="edit-role_container">
      <TextField
        className="edit-role-form_input"
        select
        value={roleID}
        label="Select Role"
        onChange={handleRoleChange}
      >
        {roleData.map((role, i) => {
          return (
            <MenuItem key={`${role.id}selectRoleIDForUpdate`} value={role.id}>
              {role.role_name}
            </MenuItem>
          );
        })}
      </TextField>
      <TextField
        className="edit-role-form_input"
        id="role_name"
        name="role_name"
        label="Role Name"
        variant="outlined"
        disabled={true}
        {...updateRoleFormik.getFieldProps("role_name")}
        {...errorHelper(updateRoleFormik, "role_name")}
        value={autoFillData.role_name}
        onChange={handleFormInputChange}
      />
      <TextField
        className="edit-role-form_input"
        id="role_description"
        name="role_description"
        label="Role Description"
        variant="outlined"
        {...updateRoleFormik.getFieldProps("role_description")}
        {...errorHelper(updateRoleFormik, "role_description")}
        value={autoFillData.role_description}
        onChange={handleFormInputChange}
      />
      <Button variant="contained" onClick={handleUpdateRoleAction}>
        Update Role
      </Button>
    </div>
  ) : null;
}

export default EditRole;
