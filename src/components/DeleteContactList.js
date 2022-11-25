import React from "react";
import { useGetSpecificContactListQuery } from "../store/contacts/apiSlice";
import { useLocation } from "react-router-dom";
import ContactTable from "./Table";
import "./styles/viewContacts.styles.scss";

function DeleteContactList() {
  const search = useLocation().search;
  const { data, isLoading, isSuccess, isError, error } =
    useGetSpecificContactListQuery(search.slice(1));
  let content;
  if (isLoading) {
    content = "Loading";
  } else if (isError) {
    content = error;
  } else if (isSuccess) {
    content = <ContactTable contact={data} del={true} />;
  }

  return <div className="contact-table_wrap">{content}</div>;
}

export default DeleteContactList;
