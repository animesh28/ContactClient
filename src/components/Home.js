import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Home() {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.email) {
      navigate("/login");
    }
  }, []);

  return auth?.email ? (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Welcome Back! {auth.name}
    </div>
  ) : (
    <></>
  );
}

export default Home;
