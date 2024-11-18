import { createBrowserRouter } from "react-router-dom";
import DEFINE_ROUTER from "../constants/router-define";
import ErrorPage from "../pages/not-found";
import App from "../App";
import InformationDetail from "../pages/home/InformationDetail";
import AdminPage from "../pages/admin/AdminPage";
import LoginAdminPage from "../pages/admin/LoginAdmin";
import TheLayout from "../pages/admin/TheLayout";
import NewInfo from "../pages/admin/Info/NewInfo";
import EditInfo from "../pages/admin/Info/EditInfo";
import TheLayoutUser from "../pages/home/TheLayoutUser";
import PaymentMethod from "../pages/home/PaymentMethod";
import TheLayoutApp from "../pages/home/layout/TheLayoutApp";
import HomePage from "../pages/home/home-page/HomePage";

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
    ]
  },
  {
    path: DEFINE_ROUTER.information,
    errorElement: <ErrorPage />,
    Component: TheLayoutUser,
    children: [
      {
        index: true,
        element: <InformationDetail />,
      },
      {
        path: DEFINE_ROUTER.payment,
        element: <PaymentMethod />,
      },
    ]
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
