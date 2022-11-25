import { Route, Routes } from "react-router-dom";
import Contact from "./components/Contact";
import Home from "./components/Home";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import UpdateContact from "./components/UpdateContact";
import DeleteContact from "./components/DeleteContact";
import DeleteContactList from "./components/DeleteContactList";
import BulkUpdate from "./components/BulkUpdate";
import Login from "./components/Login";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import GetUsers from "./components/users/GetUsers";
import AddUserForm from "./components/users/AddUserForm";
import UpdateUserForm from "./components/users/UpdateUserForm";
import ManageRoles from "./components/roles/ManageRoles";
import EditRolePerm from "./components/roles/EditRolePerm";
import EditRole from "./components/roles/EditRole";
import AddRole from "./components/roles/AddRole";
import AddList from "./components/contacts/AddList";
import Settings from "./pages/Settings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth perm="get_contact" />}>
          <Route path="list" element={<ContactList />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route element={<RequireAuth perm="delete_contact" />}>
          <Route path="delete" element={<DeleteContactList />} />
          <Route path="deleteContact" element={<DeleteContact />} />
        </Route>
        <Route element={<RequireAuth perm="add_update_contact" />}>
          <Route path="addContact" element={<AddContact />} />
          <Route path="updateContact" element={<UpdateContact />} />
          <Route path="bulkUpdate" element={<BulkUpdate />} />
          <Route path="addList" element={<AddList />} />
        </Route>
        <Route element={<RequireAuth perm="admin_settings" />}>
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route element={<RequireAuth perm="user_get_all" />}>
          <Route path="getUsers" element={<GetUsers />} />
        </Route>
        <Route element={<RequireAuth perm="user_add" />}>
          <Route path="addUser" element={<AddUserForm />} />
        </Route>
        <Route element={<RequireAuth perm="user_update" />}>
          <Route path="updateUser" element={<UpdateUserForm />} />
        </Route>
        <Route element={<RequireAuth perm="role_get_all" />}>
          <Route path="roles" element={<ManageRoles />} />
        </Route>
        <Route element={<RequireAuth perm="role_add" />}>
          <Route path="edit-role-perm" element={<EditRolePerm />} />
        </Route>
        <Route element={<RequireAuth perm="role_update" />}>
          <Route path="edit-role" element={<EditRole />} />
        </Route>

        <Route element={<RequireAuth perm="role_add" />}>
          <Route path="add-role" element={<AddRole />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
