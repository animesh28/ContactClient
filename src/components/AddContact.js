import React from "react";
import { useFormik } from "formik";
import { initialValues, validationSchemaAdd } from "./formUtils";
import { TextField } from "@mui/material";
import "./styles/addContact.styles.scss";
import {
  useAddOrUpdateContactMutation,
  useGetContactGroupsQuery,
  contactsApi,
} from "../store/contacts/apiSlice";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";

const AddContact = () => {
  const [addOrUpdateContact] = useAddOrUpdateContactMutation();

  const [listID, setListID] = React.useState("");

  const { data, isLoading, isSuccess, isError, error } =
    useGetContactGroupsQuery();
  let content;
  if (isLoading) {
    content = "Loading";
  } else if (isError) {
    content = error;
  }

  const handleChange = (event) => {
    setListID(event.target.value);
  };
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaAdd,
    onSubmit: (values, { resetForm }) => {
      const { first_name, last_name, email_address } = values;
      addOrUpdateContact({
        first_name: first_name,
        last_name: last_name,
        email_address: email_address,
        list_memberships: [listID],
      });
    },
  });

  const errorHelper = (formik, values) => {
    return {
      error: formik.errors[values] && formik.touched[values] ? true : undefined,
      helperText:
        formik.errors[values] && formik.touched[values]
          ? formik.errors[values]
          : undefined,
    };
  };

  return (
    <ApiProvider api={contactsApi}>
      <div className="contact">
        <form onSubmit={formik.handleSubmit} className="contact_form">
          <TextField
            className="contact_form-input"
            label="First Name"
            variant="standard"
            {...formik.getFieldProps("first_name")}
            {...errorHelper(formik, "first_name")}
          />
          <TextField
            className="contact_form-input"
            label="Last Name"
            variant="standard"
            {...formik.getFieldProps("last_name")}
            {...errorHelper(formik, "last_name")}
          />
          <TextField
            className="contact_form-input"
            label="Email ID"
            variant="standard"
            {...formik.getFieldProps("email_address")}
            {...errorHelper(formik, "email_address")}
          />
          <FormControl fullWidth className="contact_form-group">
            <InputLabel id="contact_lists">Contact Lists</InputLabel>
            <Select
              labelId="contact_lists"
              id="list"
              value={listID}
              label="Contact Lists"
              onChange={handleChange}
            >
              {!isSuccess
                ? content
                : data.lists.map((list, i) => {
                    return (
                      <MenuItem key={list.list_id} value={list.list_id}>
                        {list.name}
                      </MenuItem>
                    );
                  })}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={formik.handleSubmit}
            style={{ marginTop: "1rem" }}
          >
            <AddIcon fontSize="small" style={{ marginRight: "1rem" }} /> Add
            Contact
          </Button>
        </form>
      </div>
    </ApiProvider>
  );
};

export default AddContact;
