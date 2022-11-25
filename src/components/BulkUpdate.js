import {
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./styles/bulkUpdate.styles.scss";
import {
  useBulkUpdateMutation,
  useGetContactGroupsQuery,
} from "../store/contacts/apiSlice";
import { useLocation } from "react-router-dom";
import exampleCSV from "../assets/example.csv";
function BulkUpdate() {
  const { data, isLoading, isSuccess, isError, error } =
    useGetContactGroupsQuery();
  let content;
  if (isLoading) {
    content = "Loading";
  } else if (isError) {
    content = error;
  }
  const [selectedList, setSelectedList] = useState("");
  const [bulkUpdate] = useBulkUpdateMutation();
  const location = useLocation();
  useEffect(() => {
    let listID = location.hash.substring(1);
    let params = new URLSearchParams(listID);
    setSelectedList(params.get("listID"));
  }, []);

  const clickHandle = (event) => {
    let form = new FormData();
    form.append("file", document.getElementById("myFile").files[0]);
    form.append("list_ids", [selectedList]);
    console.log(form);
    bulkUpdate(form);
  };

  const handleChange = (event) => {
    setSelectedList(event.target.value);
  };
  const onDownload = () => {
    const link = document.createElement("a");
    link.download = `example.csv`;
    link.href = exampleCSV;
    link.click();
  };

  return (
    <div className="bulk-update_container">
      {!isSuccess ? (
        content
      ) : (
        <FormControl className="contact_form-group">
          <InputLabel id="contact_lists">Contact Lists</InputLabel>
          <Select
            className="bulk-update-form_input"
            labelId="contact_lists"
            id="list"
            value={selectedList}
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
      )}
      <input
        className="bulk-update-form_input"
        type="file"
        id="myFile"
        name="filename"
        accept=".csv"
      />
      <Button variant="contained" color="primary" onClick={clickHandle}>
        Upload File
      </Button>
      <Button onClick={onDownload} variant="contained" color="primary">
        Download Sample CSV File
      </Button>
    </div>
  );
}

export default BulkUpdate;
