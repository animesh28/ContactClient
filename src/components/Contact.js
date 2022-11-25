import React from "react";
import {
  contactsApi,
  useGetSpecificContactListQuery,
} from "../store/contacts/apiSlice";
import { useLocation } from "react-router-dom";
import ContactTable from "./Table";
import "./styles/viewContacts.styles.scss";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { nodeServerApi } from "../store/user/serverApiSlice";

function Contact() {
  const search = useLocation().search;
  const { data, isLoading, isSuccess, isError, error } =
    useGetSpecificContactListQuery(search.slice(1));
  let content;
  if (isLoading) {
    content = "Loading";
  } else if (isError) {
    content = error;
  } else if (isSuccess) {
    content = <ContactTable contact={data} />;
  }

  return (
    <ApiProvider api={contactsApi}>
      <div className="contact-table_wrap">{content}</div>
    </ApiProvider>
  );
}

export default Contact;
