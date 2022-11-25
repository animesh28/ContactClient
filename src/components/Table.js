import React, { useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import "./styles/deleteContact.styles.scss";
import {
  useDeleteContactMutation,
  useGetNextContactsQuery,
} from "../store/contacts/apiSlice";
import { useLocation, useNavigate } from "react-router-dom";

const unnecessaryDataKeys = [
  "contact_id",
  "update_source",
  "create_source",
  "created_at",
  "updated_at",
];

export default function StickyHeadTable({ contact, del }) {
  const navigate = useNavigate();
  const location = useLocation();
  const packData = (oldData, newData) => {
    console.log({ newDAta: newData });
    let res = [...oldData.contacts, ...newData.contacts];
    console.log(res);
    return res;
  };
  const [link, setNextLink] = React.useState(null);
  const { data, isLoading, isSuccess, isFetching, isError, error } =
    useGetNextContactsQuery(link);
  const [displayContacts, setDisplayContacts] = React.useState(contact);
  useEffect(() => {
    if (isSuccess && data && data.contacts) {
      setDisplayContacts({
        contacts: packData(displayContacts, data),
        _links: data._links,
      });
    }
  }, [data]);

  const handleNextClick = () => {
    if (displayContacts._links.next) {
      let url = displayContacts._links.next.href.slice(
        contact._links.next.href.indexOf("contact")
      );
      if (url != link) setNextLink(url);
    }
  };

  const [deleteContact] = useDeleteContactMutation();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const [search, setSearch] = React.useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase());
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteClick = (event) => {
    let toExecute =
      event.target.classList.contains("delete_btn") ||
      event.target.classList.contains("delete_btn-icon") ||
      event.target.parentElement.classList.contains("delete_btn") ||
      event.target.parentElement.classList.contains("delete_btn-icon");
    if (toExecute) {
      let tableRow = event.target;
      let deleteIcon = event.target;

      while (!deleteIcon.classList.contains("MuiButtonBase-root"))
        deleteIcon = deleteIcon.parentElement;

      while (!tableRow.classList.contains("MuiTableRow-root"))
        tableRow = tableRow.parentElement;

      tableRow.classList.add("strike-through");
      deleteIcon.style.opacity = "0";
      deleteIcon.style.display = "none";
      deleteContact(tableRow.getAttribute("contactid"));
    }
  };

  const contactsLabel = Object.keys(displayContacts.contacts[0]).map(
    (key, i) => key
  );
  if (del) contactsLabel.push("Delete");

  return (
    <div className="contact-table_flex">
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        style={{ marginBottom: "20px" }}
      >
        <TextField
          sx={{ margintTop: "20px", width: "500px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          label="Search by Name or E-mail"
          id="searchContact"
          onChange={handleSearch}
        />
        {!del ? (
          <Button
            onClick={() => navigate(`/delete${location.search}`)}
            className="delete-contacts_btn"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete Contacts
          </Button>
        ) : null}
      </Box>
      <Paper sx={{ width: "80%", overflow: "hidden", marginBottom: "15px" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {contactsLabel.map((key, i) =>
                  !unnecessaryDataKeys.includes(key) ? (
                    <TableCell
                      key={key + i + "tableHeadingRow"}
                      style={{ minWidth: "200px" }}
                    >
                      {key
                        .split("_")
                        .map((word) => word[0].toUpperCase() + word.slice(1))
                        .join(" ")}
                    </TableCell>
                  ) : null
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {displayContacts.contacts
                .filter(
                  (row) =>
                    (row.first_name &&
                      row.first_name.toLowerCase().indexOf(search) != -1) ||
                    (row.email_address.address &&
                      row.email_address.address.toLowerCase().indexOf(search) !=
                        -1)
                )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, rowid) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.contact_id + "delete" + rowid}
                      onClick={handleDeleteClick}
                      contactid={row.contact_id}
                    >
                      {contactsLabel.map((key, i) => {
                        if (!unnecessaryDataKeys.includes(key)) {
                          console.log("valid", key);
                          if (key === "email_address") {
                            return <TableCell>{row[key].address}</TableCell>;
                          }
                          if (row[key])
                            return <TableCell>{row[key]}</TableCell>;
                          if (key === "Delete")
                            return (
                              <TableCell>
                                <IconButton className="delete_btn">
                                  <DeleteIcon className="delete_btn-icon" />
                                </IconButton>
                              </TableCell>
                            );
                          return <TableCell>{}</TableCell>;
                        }
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className="contact-table_pagination"
          rowsPerPageOptions={[25, 50]}
          component="div"
          count={displayContacts.contacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Button onClick={handleNextClick}>Load More Contacts</Button>
    </div>
  );
}
