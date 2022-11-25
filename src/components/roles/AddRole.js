import React from "react";
import { useAddRoleMutation } from "../../store/user/serverApiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../helper/formik";
import { TextField, Button } from "@mui/material";
import "./AddRole.styles.scss";

function AddRole() {
  const [addRole] = useAddRoleMutation();
  const addRoleFormik = useFormik({
    initialValues: {
      role_name: "",
      role_description: "",
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      role_name: Yup.string().required("Sorry, Role Name is required"),

      role_description: Yup.string().required(
        "Sorry, Role Description is required"
      ),
    }),
    onSubmit: (values, { resetForm }) => {
      addRole(values);
      resetForm();
    },
  });
  return (
    <div className="add-role_container">
      <TextField
        className="edit-role-form_input"
        id="role_name"
        name="role_name"
        label="Role Name"
        variant="filled"
        placeholder="ex: admin"
        {...addRoleFormik.getFieldProps("role_name")}
        {...errorHelper(addRoleFormik, "role_name")}
      />
      <TextField
        className="edit-role-form_input"
        id="role_description"
        name="role_description"
        label="Role Description"
        variant="filled"
        placeholder="ex: System Administrator"
        {...addRoleFormik.getFieldProps("role_description")}
        {...errorHelper(addRoleFormik, "role_description")}
      />
      <Button variant="contained" onClick={addRoleFormik.handleSubmit}>
        Add Role
      </Button>
    </div>
  );
}

export default AddRole;
