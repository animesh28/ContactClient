import React, { useEffect, useState } from "react";
import "./ManageRoles.styles.scss";
import {
  useDeleteRoleMutation,
  useGetRolesQuery,
} from "../../store/user/serverApiSlice";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ManageRoles() {
  const { data, isError, isLoading, isSuccess, error } = useGetRolesQuery();
  const [currentRolePerm, setCurrentRolePerm] = useState([]);
  const { auth } = useAuth();
  useEffect(() => {
    if (isSuccess && auth?.role) {
      data.forEach((role) => {
        if (role.id === auth.role) {
          setCurrentRolePerm(role.permissions.map((perm) => perm.perm_name));
        }
      });
    }
  }, [data]);

  const navigate = useNavigate();
  const handleActionClick = (event) => {
    let clicked = event.target;

    while (!clicked.classList.contains("role_item-action-item"))
      clicked = clicked.parentElement;

    const roleID = clicked.getAttribute("roleid");
    const route = clicked.getAttribute("action");

    navigate(`/${route}#roleID=${roleID}`);
  };

  const [deleteDialogData, setDeleteDialogData] = useState({
    text: "",
    positive: "Delete",
    negative: "Cancel",
    roleID: -1,
  });
  const [showDialog, setShowDialog] = useState(false);

  const [deleteRole] = useDeleteRoleMutation();
  const handleDeleteAction = (event) => {
    let clicked = event.target;

    while (!clicked.classList.contains("role_item-action-item"))
      clicked = clicked.parentElement;

    let parentNode = clicked;

    while (!parentNode.classList.contains("role_item"))
      parentNode = parentNode.parentElement;

    const roleName = clicked.getAttribute("rolename");
    const roleID = clicked.getAttribute("roleid");
    setDeleteDialogData({
      ...deleteDialogData,
      text: roleName,
      roleID: roleID,
      parentNode: parentNode,
    });
    setShowDialog(true);
  };

  const handleDialogClose = (event) => {
    const deleteAction = event.target.getAttribute("todo");
    if (deleteAction) {
      deleteRole(deleteDialogData.roleID).then((_) => {
        deleteDialogData.parentNode.classList.add("deleted-item");
      });
    }

    setShowDialog(false);
  };

  return isError ? (
    <>{error}</>
  ) : isLoading ? (
    <>Loading Details</>
  ) : currentRolePerm ? (
    <div className="role_container">
      {data.map((role) => {
        const { id, role_name, role_description, permissions } = role;
        const roleName = role_name.charAt(0).toUpperCase() + role_name.slice(1);
        const roleDescription =
          role_description.charAt(0).toUpperCase() + role_description.slice(1);
        return (
          <div
            className="role_item"
            roleid={id}
            key={`manage_role_item${id}_${role_name}`}
          >
            <p className="role_item-name">Role Name: {roleName}</p>
            <p className="role_item-name">
              Role Description: {roleDescription}
            </p>
            <div className="role_item-action">
              {currentRolePerm.includes("role_update") ? (
                <div
                  className="role_item-action-item"
                  roleid={id}
                  action="edit-role"
                  onClick={handleActionClick}
                >
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                  <p>Edit Role Description</p>
                </div>
              ) : null}
              {currentRolePerm.includes("role_add") ? (
                <div
                  className="role_item-action-item"
                  action="edit-role-perm"
                  roleid={id}
                  onClick={handleActionClick}
                >
                  <IconButton>
                    <AdminPanelSettingsIcon />
                  </IconButton>
                  <p>Edit Role's Permissions</p>
                </div>
              ) : null}
              {currentRolePerm.includes("role_delete") ? (
                <div
                  className="role_item-action-item"
                  action="delete-role"
                  roleid={id}
                  rolename={roleName}
                  onClick={
                    role_name === "admin"
                      ? (e) => {
                          /*skip delete*/
                        }
                      : handleDeleteAction
                  }
                >
                  <IconButton disabled={role_name === "admin" ? true : false}>
                    <DeleteForeverIcon />
                  </IconButton>
                  <p>Delete Role</p>
                </div>
              ) : null}
            </div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${id}a-content`}
                id={`panel${id}a-header`}
                className="role_item-header"
              >
                <Typography>{roleName}'s Permissions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {permissions.map((perm) => (
                  <Typography
                    key={`manage_role_item${perm.id}_${perm.perm_name}`}
                  >
                    {perm.perm_description}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
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
  ) : null;
}

export default ManageRoles;
