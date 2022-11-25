import axios from "axios";
import Cookies from "universal-cookie";
import { successsMessage } from "../subcomponents/ToastMessage";
const cookies = new Cookies();

const getAuthCode_URL = "https://contact-sever.onrender.com/getAuthURL";

export const requestAuthURL = () => {
  axios({
    method: "get",
    url: `${getAuthCode_URL}`,
  })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log(error));
};

export const requestToken = () => {
  axios({
    method: "get",
    url: `https://contact-sever.onrender.com/api/constant-contact/refreshToken`,
    headers: {
      "Content-Type": "application/json",
      Authorization: new Cookies().get("user-token"),
    },
  })
    .then((result) => {
      console.log(result);
      cookies.set("x-access-token", result.data.access_token);
      successsMessage("Token successfully retrieved");
      window.location.reload();
    })
    .catch((error) => console.log(error));
};
