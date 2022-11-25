import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import React from "react";
import {
  nodeServerApi,
  useGetUsersQuery,
} from "../../store/user/serverApiSlice";
import AllUserData from "../../subcomponents/AllUserData";
function GetUsers() {
  const { data, error, isLoading, isSuccess, isError } = useGetUsersQuery();
  let content;
  if (isLoading) {
    content = "Loading";
  } else if (isError) {
    content = error;
  } else if (isSuccess) {
    content = <AllUserData userData={data} />;
  }
  return <ApiProvider api={nodeServerApi}>{content}</ApiProvider>;
}

export default GetUsers;
