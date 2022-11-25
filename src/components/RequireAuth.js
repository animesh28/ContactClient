import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useGetRoleByIDQuery } from "../store/user/serverApiSlice";

const RequireAuth = ({ perm }) => {
  const { auth } = useAuth();
  const location = useLocation();
  const { data, isLoading, isError, error } = useGetRoleByIDQuery(auth.role);

  return isError ? (
    <>{error}</>
  ) : isLoading ? (
    <>Loading</>
  ) : data.permissions.find((per) => perm === per.perm_name) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
