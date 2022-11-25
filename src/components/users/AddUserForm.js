import React, { useState } from "react";
import { errorHelper } from "../../helper/formik";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, TextField, MenuItem } from "@mui/material";
import {
  useGetRolesQuery,
  useAddUserMutation,
} from "../../store/user/serverApiSlice";
import "./AddUserForm.styles.scss";
import useAuth from "../../hooks/useAuth";

function AddUserForm() {
  const { auth } = useAuth();
  const { data, isLoading, isSuccess, isError, error } = useGetRolesQuery();
  const [addUser] = useAddUserMutation();
  const [roleID, setRoleID] = useState(auth?.role);

  let content;
  if (isLoading) {
    content = "Loading";
  } else if (isError) {
    content = error;
  }

  const handleChange = (event) => {
    setRoleID(event.target.value);
  };

  const addUserFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullname: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry, E-mail is required")
        .email("Enter a valid e-mail"),

      password: Yup.string().required("Sorry, Password is required"),

      fullname: Yup.string().required("Sorry, Full Name is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      addUser({ ...values, role_id: roleID });
      resetForm();
    },
  });
  return (
    <div className="add-user-form">
      <TextField
        className="add-user-form_input"
        id="email"
        label="E-mail"
        variant="filled"
        {...addUserFormik.getFieldProps("email")}
        {...errorHelper(addUserFormik, "email")}
      />
      <TextField
        className="add-user-form_input"
        id="password"
        label="Password"
        variant="filled"
        {...addUserFormik.getFieldProps("password")}
        {...errorHelper(addUserFormik, "password")}
      />
      <TextField
        className="add-user-form_input"
        id="fullname"
        label="Full Name"
        variant="filled"
        {...addUserFormik.getFieldProps("fullname")}
        {...errorHelper(addUserFormik, "fullname")}
      />
      {!isSuccess ? (
        content
      ) : (
        <TextField
          className="add-user-form_input"
          select // tell TextField to render select
          value={roleID}
          label="Select Role"
          variant="filled"
          onChange={handleChange}
        >
          {data.map((role, i) => {
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
      <Button variant="contained" onClick={addUserFormik.handleSubmit}>
        Add User
      </Button>
    </div>
  );
}

export default AddUserForm;
