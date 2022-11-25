import React from "react";
import { useAddListMutation } from "../../store/contacts/apiSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from "../../helper/formik";
import { TextField, Button } from "@mui/material";
import "./AddList.styles.scss";

function AddList() {
  const [addList] = useAddListMutation();
  const addListFormik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      name: Yup.string().required("Sorry, List Name is required"),

      description: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      addList(values);
      resetForm();
    },
  });
  return (
    <div className="add-list_container">
      <TextField
        className="edit-role-form_input"
        id="name"
        name="name"
        label="List Name"
        variant="filled"
        {...addListFormik.getFieldProps("name")}
        {...errorHelper(addListFormik, "name")}
      />
      <TextField
        className="edit-role-form_input"
        id="description"
        name="description"
        label="Description"
        variant="filled"
        {...addListFormik.getFieldProps("description")}
        {...errorHelper(addListFormik, "description")}
      />
      <Button variant="contained" onClick={addListFormik.handleSubmit}>
        Add List
      </Button>
    </div>
  );
}

export default AddList;
