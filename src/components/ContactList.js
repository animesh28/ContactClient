import { useGetContactGroupsQuery } from "../store/contacts/apiSlice";
import ContactGroup from "../subcomponents/ContactGroup";
import "./styles/response.styles.scss";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { contactsApi } from "../store/contacts/apiSlice";
import Cookies from "universal-cookie";
import { requestToken } from "../api/constantContact";
import { Button } from "@mui/material";

function ContactList() {
  const constantToken = new Cookies().get("x-access-token");

  const { data, isLoading, isSuccess, isError, error } =
    useGetContactGroupsQuery();
  let content;
  if (isLoading) {
    content = "Loading";
  } else if (isError) {
    content = error;
  } else if (isSuccess) {
    content = <ContactGroup lists={data.lists} />;
  }

  return constantToken ? (
    <ApiProvider api={contactsApi}>
      <div className="response">{content}</div>
    </ApiProvider>
  ) : (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        onClick={requestToken}
        id="getAuthBtn"
        sx={{
          marginBottom: "10px",
        }}
      >
        Connect Constant Contact
      </Button>
    </div>
  );
}

export default ContactList;
