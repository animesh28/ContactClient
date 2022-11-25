import { useState } from "react";
import "./allUserData.styles.scss";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  useDeleteUserMutation,
  useGetRoleByIDQuery,
} from "../store/user/serverApiSlice";

function AllUserData({ userData }) {
  const { data, isLoading, isError, error } = useGetRoleByIDQuery(
    JSON.parse(sessionStorage.getItem("user")).role
  );
  const navigate = useNavigate();
  const [deleteDialogData, setDeleteDialogData] = useState({
    text: "",
    positive: "Delete",
    negative: "Cancel",
    userID: -1,
  });
  const [showDialog, setShowDialog] = useState(false);

  const [deleteUser] = useDeleteUserMutation();
  const handleDialogClose = (event) => {
    const deleteAction = event.target.getAttribute("todo");
    if (deleteAction) {
      deleteUser(deleteDialogData.userID).then((_) => {
        deleteDialogData.parentNode.classList.add("deleted-item");
      });
    }

    setShowDialog(false);
  };

  const navigateToAction = (event) => {
    let el = event.target;
    if (
      el.classList.contains("MuiSvgIcon-root") ||
      el.parentElement.classList.contains("MuiSvgIcon-root") ||
      el.classList.contains("MuiIconButton-root") ||
      el.parentElement.classList.contains("MuiIconButton-root")
    ) {
      while (!el.classList.contains("MuiIconButton-root"))
        el = el.parentElement;

      let item_container = el;
      while (!item_container.classList.contains("all-user_item"))
        item_container = item_container.parentElement;

      const route = el.getAttribute("route");
      const user_id = el.parentElement.getAttribute("userid");
      const role_id = el.parentElement.getAttribute("roleid");
      if (route === "updateUser")
        navigate(`/${route}#userID=${user_id}&roleID=${role_id}`);
      else if (route === "deleteUser") {
        const username = el.getAttribute("username");
        setDeleteDialogData({
          ...deleteDialogData,
          text: username,
          userID: user_id,
          parentNode: item_container,
        });
        setShowDialog(true);
      }
    }
  };

  return (
    <div className="all-user">
      {userData.map((user, i) => {
        const { id, email, fullname, Role } = user;
        const { role_description, id: role_id } = Role;
        return (
          <div className="all-user_item" key={`${email}getUserPage${i}`}>
            <div className="all-user_item-text">
              <div className="all-user_item-detail">{`E-mail ID: ${email}`}</div>
              <div className="all-user_item-detail">{`Name: ${fullname}`}</div>
              <div className="all-user_item-detail">{`Role: ${role_description}`}</div>
            </div>
            <div
              className="all-user_item-icons"
              userid={id}
              roleid={role_id}
              onClick={navigateToAction}
            >
              {isError ? (
                <>{error}</>
              ) : isLoading ? (
                <>Loading</>
              ) : data.permissions.find(
                  (per) => "user_update" === per.perm_name
                ) ? (
                <IconButton route="updateUser">
                  <EditIcon />
                </IconButton>
              ) : null}

              {isError ? (
                <>{error}</>
              ) : isLoading ? (
                <>Loading</>
              ) : data.permissions.find(
                  (per) => "user_delete" === per.perm_name
                ) ? (
                <IconButton route="deleteUser" username={fullname}>
                  <DeleteForeverIcon />
                </IconButton>
              ) : null}
            </div>
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
              {"Are you sure you want to delete this contact?"}
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

export default AllUserData;
