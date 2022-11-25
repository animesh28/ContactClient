import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import AutoDeleteIcon from "@mui/icons-material/AutoDelete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./ContactGroup.styles.scss";
import { useDeleteListMutation } from "../store/contacts/apiSlice";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function ContactGroup({ lists, del }) {
  const [deleteList] = useDeleteListMutation();
  const navigate = useNavigate();

  const [deleteDialogData, setDeleteDialogData] = useState({
    text: "",
    positive: "Delete",
    negative: "Cancel",
    listID: -1,
  });
  const [showDialog, setShowDialog] = useState(false);
  const handleDeleteList = (event) => {
    let clicked = event.target;

    while (!clicked.classList.contains("delete-list-icon"))
      clicked = clicked.parentElement;

    let parentNode = clicked;

    while (!parentNode.classList.contains("contact-group_item"))
      parentNode = parentNode.parentElement;

    const listID = clicked.getAttribute("listid");
    const listName = clicked.getAttribute("listname");
    setDeleteDialogData({
      ...deleteDialogData,
      text: listName,
      listID: listID,
      parentNode: parentNode,
    });
    setShowDialog(true);
  };

  const handleUpdateList = (event) => {
    let clicked = event.target;

    while (!clicked.classList.contains("upload-list-icon"))
      clicked = clicked.parentElement;

    const listId = clicked.getAttribute("listid");
    navigate(`/bulkUpdate#listID=${listId}`);
  };

  const handleDialogClose = (event) => {
    const deleteAction = event.target.getAttribute("todo");
    if (deleteAction) {
      deleteList(deleteDialogData.listID).then((_) => {
        deleteDialogData.parentNode.classList.add("deleted-item");
      });
    }

    setShowDialog(false);
  };
  return (
    <div className="contact-group_container">
      <Link to="/addList">
        <Button
          className="create-list"
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
        >
          Create Contact List
        </Button>
      </Link>

      {lists.map((list, i) => {
        let redirectURL;
        if (del) {
          redirectURL = `/delete?${list.list_id}`;
        } else {
          redirectURL = `/contact?${list.list_id}`;
        }
        return (
          <div
            className="contact-group_item"
            key={`contact-group_item${i}${list.list_id}`}
          >
            <span className="contact-group_name">{list.name}</span>
            <span className="contact-group_count">
              {list.membership_count} Contacts
            </span>
            <Link to={redirectURL}>
              <IconButton>
                <VisibilityIcon fontSize="large" />
              </IconButton>
            </Link>
            <IconButton
              onClick={handleDeleteList}
              listid={list.list_id}
              listname={list.name}
              className="delete-list-icon"
            >
              <AutoDeleteIcon fontSize="large" />
            </IconButton>
            <IconButton
              onClick={handleUpdateList}
              listid={list.list_id}
              listname={list.name}
              className="upload-list-icon"
            >
              <CloudUploadIcon fontSize="large" />
            </IconButton>
          </div>
        );
      })}
      {showDialog ? (
        <div>
          <Dialog
            open={showDialog}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete this role?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {deleteDialogData.text}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>
                {deleteDialogData.negative}
              </Button>
              <Button onClick={handleDialogClose} autoFocus todo="delete">
                {deleteDialogData.positive}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : null}
    </div>
  );
}

export default ContactGroup;
