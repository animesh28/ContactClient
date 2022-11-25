import React, { useEffect, useState } from "react";
import { errorHelper } from "../../helper/formik";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, TextField, MenuItem } from "@mui/material";
import {
  useGetRolesQuery,
  useUpdateUserMutation,
  useGetUsersQuery,
} from "../../store/user/serverApiSlice";
import { useLocation } from "react-router-dom";
import "./AddUserForm.styles.scss";
import useAuth from "../../hooks/useAuth";

function UpdateUserForm() {
  const location = useLocation();
  const { auth } = useAuth();

  const {
    data: rolesData,
    isLoading: rolesLoading,
    isSuccess: rolesSuccess,
    isError: rolesIsError,
    error: rolesError,
  } = useGetRolesQuery();

  const {
    data: userData,
    isLoading: userLoading,
    isSuccess: userSuccess,
    isError: userIsError,
    error: userError,
  } = useGetUsersQuery();

  let initialUserID = auth?.id;
  if (location.hash) {
    const code = location.hash.substring(1);
    const params = new URLSearchParams(code);
    initialUserID = Number(params.get("userID"));
  }
  const [updateUser] = useUpdateUserMutation();
  const [roleID, setRoleID] = useState(auth?.role);
  const [userID, setUserID] = useState(initialUserID);
  const [autoFillData, setAutoFillData] = useState({
    email: "",
    fullname: "",
  });
  useEffect(() => {
    if (userSuccess && userData) {
      const filterUser = userData.filter((user) => user.id === userID);
      const { email, fullname, role_id } = filterUser[0];
      setAutoFillData({ email, fullname });
      setRoleID(role_id);
    }
  }, [userData]);

  let content;
  if (rolesLoading) {
    content = "Roles Loading";
  } else if (rolesIsError) {
    content = rolesError;
  }

  let userContent;
  if (userLoading) {
    content = "Users Loading";
  } else if (userIsError) {
    content = userError;
  }

  const handleRoleChange = (event) => {
    setRoleID(event.target.value);
  };

  const handleUserChange = (event) => {
    const userID = event.target.value;
    setUserID(userID);
    const filterUser = userData.filter((user) => user.id === userID);
    const { email, fullname, role_id } = filterUser[0];
    setAutoFillData({ email, fullname });
    setRoleID(role_id);
  };

  const handleFormInputChange = (event) => {
    updateUserFormik.handleChange(event);
    setAutoFillData({
      ...autoFillData,
      [event.target.name]: event.target.value,
    });
  };

  const updateUserFormik = useFormik({
    initialValues: {
      ...autoFillData,
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry, E-mail is required")
        .email("Enter a valid e-mail"),

      fullname: Yup.string().required("Sorry, Full Name is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const userData = { ...values, role_id: roleID };
      updateUser({ data: userData, id: userID });
      resetForm();
    },
  });
  return (
    <div className="add-user-form">
      {!userSuccess ? (
        userContent
      ) : (
        <TextField
          className="add-user-form_input"
          select
          value={userID}
          label="Select User"
          onChange={handleUserChange}
        >
          {userData.map((user, i) => {
            return (
              <MenuItem
                key={`${user.email}selectUserIDForUpdate`}
                value={user.id}
              >
                {user.fullname}
              </MenuItem>
            );
          })}
        </TextField>
      )}
      <TextField
        className="add-user-form_input"
        id="email"
        name="email"
        label="E-mail"
        variant="filled"
        {...updateUserFormik.getFieldProps("email")}
        {...errorHelper(updateUserFormik, "email")}
        value={autoFillData.email}
        onChange={handleFormInputChange}
      />
      <TextField
        className="add-user-form_input"
        id="fullname"
        name="fullname"
        label="Full Name"
        variant="filled"
        {...updateUserFormik.getFieldProps("fullname")}
        {...errorHelper(updateUserFormik, "fullname")}
        onChange={handleFormInputChange}
        value={autoFillData.fullname}
      />
      {!rolesSuccess ? (
        content
      ) : (
        <TextField
          className="add-user-form_input"
          select
          value={roleID}
          label="Select Role"
          onChange={handleRoleChange}
        >
          {rolesData.map((role, i) => {
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
      )}
      <Button variant="contained" onClick={updateUserFormik.handleSubmit}>
        Update User
      </Button>
    </div>
  );
}

export default UpdateUserForm;
