import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  errorMessage,
  successsMessage,
} from "../../subcomponents/ToastMessage";
import Cookies from "universal-cookie";
export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.cc.email/v3",
    prepareHeaders: (headers) => {
      const token = new Cookies().get("x-access-token");

      // If we have a token set in cookie.
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getContactGroups: builder.query({
      query: () =>
        `contact_lists?include_count=true&include_membership_count=all`,
    }),

    getSpecificContactList: builder.query({
      query: (id) => `contacts?lists=${id}`,
    }),

    getNextContacts: builder.query({
      query: (url) => url,
    }),

    addList: builder.mutation({
      query: (contactData) => ({
        url: "contact_lists",
        method: "POST",
        body: contactData,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.list_id) successsMessage(`List Created`);
        } catch (err) {
          errorMessage(err);
        }
      },
    }),

    deleteList: builder.mutation({
      query: (id) => ({
        url: `contact_lists/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          successsMessage(`List Deleted`);
        } catch (err) {
          errorMessage(err);
        }
      },
    }),

    addOrUpdateContact: builder.mutation({
      query: (contactData) => ({
        url: "contacts/sign_up_form",
        method: "POST",
        body: contactData,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          successsMessage(
            `Contact ${
              data.action.charAt(0).toUpperCase() + data.action.slice(1)
            }`
          );
        } catch (err) {
          errorMessage(err);
        }
      },
    }),

    bulkUpdate: builder.mutation({
      query: (contactData) => ({
        url: "activities/contacts_file_import",
        method: "POST",
        body: contactData,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          successsMessage(`Updated`);
        } catch (err) {
          errorMessage(err);
        }
      },
    }),

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          successsMessage("Contact Deleted");
        } catch (err) {
          errorMessage(err);
        }
      },
    }),
  }),
});

export const {
  useGetContactGroupsQuery,
  useGetSpecificContactListQuery,
  useAddOrUpdateContactMutation,
  useDeleteContactMutation,
  useBulkUpdateMutation,
  useGetNextContactsQuery,
  useAddListMutation,
  useDeleteListMutation,
} = contactsApi;
