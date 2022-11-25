import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import RemoveModeratorIcon from "@mui/icons-material/RemoveModerator";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Unauthorized</h1>

      <br />
      <RemoveModeratorIcon fontSize="large" />
      <br />
      <p>You do not have access to the requested page.</p>
      <br />
      <div className="flexGrow">
        <Button variant="contained" onClick={goBack}>
          Go Back
        </Button>
      </div>
    </section>
  );
};

export default Unauthorized;
