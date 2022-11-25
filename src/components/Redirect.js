import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAccessToken } from "../api/constantContact";
import Cookies from "universal-cookie";

function Redirect() {
  let location = useLocation();
  const navigateTo = useNavigate();
  const cookies = new Cookies();

  useEffect(() => {
    // let code = location.hash.substring(1);
    // let params = new URLSearchParams(code);
    // cookies.set("x-access-token", params.get("access_token"));
    // localStorage.setItem("x-access-token", params.get("access_token"));
    // navigateTo("/");
  }, [location.search, navigateTo]);

  return <div className="data">You're being verified please wait.......</div>;
}

export default Redirect;
