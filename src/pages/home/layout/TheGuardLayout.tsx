import { useSelector } from "react-redux";
import { IRootState } from "../../../lib/store";
import { Navigate, Outlet } from "react-router-dom";
import DEFINE_ROUTER from "../../../constants/router-define";

export default function TheGuardLayout() {
  const user = useSelector((state: IRootState) => state.user);
  if (!user?._id || !user?.phone_number) {
    return <Navigate to={DEFINE_ROUTER.login} replace />;
  }
  return <Outlet />;
}
