import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  errorMessage,
  successsMessage,
} from "../../subcomponents/ToastMessage";
import Cookies from "universal-cookie";

export const nodeServerApi = createApi({
  reducerPath: "nodeServerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://contact-sever.onrender.com/api",
    prepareHeaders: (headers) => {
      const token = new Cookies().get("user-token");

      // If we have a token set in cookie.
      if (token) {
        headers.set("Authorization", token);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `users`,
    }),

    getPermissions: builder.query({
      query: () => `permissions`,
    }),

    getRoles: builder.query({
      query: () => `roles`,
    }),

    getRoleByID: builder.query({
      query: (id) => `roles/${id}`,
    }),

    addUser: builder.mutation({
      query: (userData) => ({
        url: "users",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.errors) {
            errorMessage(data.errors[0].message);
          } else successsMessage(`New User added: ${data.fullname}`);
        } catch (err) {
          const { error } = err;
          const errMsg = error.data.errors[0].message;

          errorMessage(errMsg.charAt(0).toUpperCase() + errMsg.slice(1));
        }
      },
    }),

    updateUser: builder.mutation({
      query: (userData) => ({
        url: `users/${userData.id}`,
        method: "PUT",
        body: userData.data,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (!data) {
            errorMessage("Error occurred updating user. Try Again!");
          } else
            successsMessage(
              data.message.charAt(0).toUpperCase() + data.message.slice(1)
            );
        } catch (err) {
          errorMessage(err);
        }
      },
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.message.indexOf("not") >= 0) errorMessage(data.message);
          else successsMessage(data.message);
        } catch (err) {
          errorMessage(err);
        }
      },
    }),

    addPermissionToRole: builder.mutation({
      query: (roleData) => ({
        url: `roles/permissions/${roleData.id}`,
        method: "POST",
        body: { permissions: roleData.data },
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            errorMessage(data.msg.message);
          } else successsMessage("Permissions Updated");
        } catch (err) {
          errorMessage(err);
        }
      },
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `roles/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.message.indexOf("not") >= 0) errorMessage(data.message);
          else {
            successsMessage(data.message);
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        } catch (err) {
          errorMessage(err);
        }
      },
    }),

    addRole: builder.mutation({
      query: (roleData) => ({
        url: `roles`,
        method: "POST",
        body: roleData,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.id) {
            successsMessage(`Role Created: ${data.role_description}`);
            window.location.href = `/edit-role-perm#roleID=${data.id}`;
          }
        } catch (err) {
          errorMessage(err);
        }
      },
    }),

    editRole: builder.mutation({
      query: (roleData) => ({
        url: `roles/${roleData.id}`,
        method: "PUT",
        body: roleData.data,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.success) {
            errorMessage(data.msg.message);
          } else successsMessage("Role Updated");
        } catch (err) {
          errorMessage(err);
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetRolesQuery,
  useAddUserMutation,
  useGetRoleByIDQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetPermissionsQuery,
  useAddPermissionToRoleMutation,
  useEditRoleMutation,
  useDeleteRoleMutation,
  useAddRoleMutation,
} = nodeServerApi;
