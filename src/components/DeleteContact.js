import { useGetContactGroupsQuery } from "../store/contacts/apiSlice";
import ContactGroup from "../subcomponents/ContactGroup";
import "./styles/response.styles.scss";

function DelteContact() {
  const { data, isLoading, isSuccess, isError, error } =
    useGetContactGroupsQuery();
  let content;
  if (isLoading) {
    content = "Loading";
  } else if (isError) {
    content = error;
  } else if (isSuccess) {
    content = <ContactGroup lists={data.lists} del={true} />;
  }

  return <div className="response">{content}</div>;
}

export default DelteContact;
