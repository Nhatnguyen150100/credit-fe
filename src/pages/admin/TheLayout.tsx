import cookiesStore from "../../plugins/cookiesStore";
import { Navigate, Outlet } from "react-router-dom";
import DEFINE_ROUTER from "../../constants/router-define";
import { Button, Divider } from "antd";

export default function TheLayout() {
  const admin = cookiesStore.get("admin");

  if (!admin) {
    return (
      <div className="h-full w-full justify-center flex-col space-y-5 mt-10 flex items-center text-3xl font-bold text-red-600">
        Unauthorized
        <Navigate to={DEFINE_ROUTER.loginAdmin} replace />
      </div>
    );
  }

  const handleLogOut = () => {
    cookiesStore.remove("admin");
    cookiesStore.remove("access_token");
    window.location.href = DEFINE_ROUTER.home;
  };

  return (
    <div className="flex flex-col justify-start p-5 items-center space-y-5">
      <header className="w-full py-2 justify-between flex items-center">
        <a
          className="uppercase text-3xl primary-color font-bold justify-start items-center flex"
          href={DEFINE_ROUTER.home}
        >
          VAY CASH ADMIN
        </a>
        <Button
          type="primary"
          className="text-base capitalize"
          onClick={handleLogOut}
        >
          đăng xuất
        </Button>
      </header>
      <Divider
        variant="dashed"
        style={{ borderWidth: "1px", borderColor: "black" }}
      />
      <div className="container w-full">
        <Outlet />
      </div>
    </div>
  );
}
