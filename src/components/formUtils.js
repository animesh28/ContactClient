import * as Yup from "yup";

export const initialValues = {
  first_name: "",
  last_name: "",
  email_address: "",
};

export const validationSchemaAdd = Yup.object({
  first_name: Yup.string().required("First Name is required"),

  last_name: Yup.string().required("Last Name is required"),

  email_address: Yup.string()
    .required("E-mail is required")
    .email("Please enter a valid E-mail"),
});

export const validationSchemaUpdate = Yup.object({
  first_name: Yup.string(),

  last_name: Yup.string(),

  email_address: Yup.string()
    .required("Sorry, E-mail is required")
    .email("Please enter a valid E-mail"),
});

export const handleSubmit = async (values) => {};
