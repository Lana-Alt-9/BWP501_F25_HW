import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PathConstants from "../../routes/pathConstants";

const PrivateRoutes = () => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSessionLoading = useSelector(
    (state) => state.auth.isSessionLoading,
  );

  if (isSessionLoading) {
    return (
      <p className="text-center p-4" role="status">
        جارٍ التحقق من تسجيل الدخول...
      </p>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={PathConstants.LOGIN} state={{ from: location }} replace />
  );
};
export default PrivateRoutes;
