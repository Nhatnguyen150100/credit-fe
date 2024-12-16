import { createBrowserRouter } from "react-router-dom";
import DEFINE_ROUTER from "../constants/router-define";
import ErrorPage from "../pages/not-found";
import InformationDetail from "../pages/home/loan-application/InformationDetail";
import AdminPage from "../pages/admin/AdminPage";
import LoginAdminPage from "../pages/admin/LoginAdmin";
import TheLayout from "../pages/admin/TheLayout";
import NewInfo from "../pages/admin/Info/NewInfo";
import EditInfo from "../pages/admin/Info/EditInfo";
import PaymentMethod from "../pages/home/loan-application/PaymentMethod";
import TheLayoutApp from "../pages/home/layout/TheLayoutApp";
import HomePage from "../pages/home/home-page/HomePage";
import PaymentApplication from "../pages/home/loan-application/PaymentApplication";
import Profile from "../pages/home/profile/Profile";
import Setting from "../pages/home/profile/setting/Setting";
import LoginPage from "../pages/home/profile/login/LoginPage";
import MyAccountBanking from "../pages/home/profile/account-banking/MyAccountBanking";
import Term from "../pages/home/profile/term/Term";
import LoginByAdminPage from "../pages/home/profile/login/LoginByAdminPage";

const router = createBrowserRouter([
  {
    path: DEFINE_ROUTER.home,
    errorElement: <ErrorPage />,
    Component: TheLayoutApp,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: DEFINE_ROUTER.paymentApplication,
        element: <PaymentApplication />,
      },
      {
        path: DEFINE_ROUTER.my,
        element: <Profile />,
      },
      {
        path: DEFINE_ROUTER.setting,
        element: <Setting />,
      },
      {
        path: DEFINE_ROUTER.myBank,
        element: <MyAccountBanking />,
      },
      {
        path: DEFINE_ROUTER.term,
        element: <Term />,
      },
    ],
  },
  {
    path: DEFINE_ROUTER.login,
    errorElement: <ErrorPage />,
    element: <LoginPage />,
  },
  {
    path: DEFINE_ROUTER.loginByAdmin,
    errorElement: <ErrorPage />,
    element: <LoginByAdminPage />,
  },
  {
    path: DEFINE_ROUTER.information,
    errorElement: <ErrorPage />,
    element: <InformationDetail />,
  },
  {
    path: DEFINE_ROUTER.payment,
    errorElement: <ErrorPage />,
    element: <PaymentMethod />,
  },
  {
    path: DEFINE_ROUTER.admin,
    errorElement: <ErrorPage />,
    Component: TheLayout,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: DEFINE_ROUTER.newInfo,
        element: <NewInfo />,
      },
      {
        path: DEFINE_ROUTER.editInfo,
        element: <EditInfo />,
      },
    ],
  },
  {
    path: DEFINE_ROUTER.loginAdmin,
    errorElement: <ErrorPage />,
    element: <LoginAdminPage />,
  },
]);

export default router;
