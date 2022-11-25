export const errorHelper = (formik, values) => {
  return {
    error: formik.errors[values] && formik.touched[values] ? true : undefined,
    helperText:
      formik.errors[values] && formik.touched[values]
        ? formik.errors[values]
        : undefined,
  };
};
