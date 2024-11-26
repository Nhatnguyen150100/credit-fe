import { useLocation } from "react-router-dom";
import DEFINE_ROUTER from "../../../constants/router-define";
import { useSelector } from "react-redux";
import { IRootState } from "../../../lib/store";
import { message } from "antd";

export default function BottomBar() {
  const user = useSelector((state: IRootState) => state.user);
  const location = useLocation();

  const LIST_TAB = [
    {
      label: "Trang chủ",
      path: DEFINE_ROUTER.home,
      icon: "home",
    },
    {
      label: "Đơn vay",
      path: DEFINE_ROUTER.paymentApplication,
      icon: "loan",
      handleClick: () => {
        if (!(user?._id || user?.phone_number)) {
          message.error("Đăng nhập để xem thông tin đơn vay");
          return;
        }
        window.location.href = DEFINE_ROUTER.paymentApplication;
      },
    },
    {
      label: "Của tôi",
      path: DEFINE_ROUTER.my,
      icon: "user",
    },
  ];

  return (
    <div className="py-1 bg-white border-b border-solid flex flex-row justify-evenly items-end w-full mb-1 shadow-lg">
      {LIST_TAB.map((item) => {
        const isActive = item.path === location.pathname;
        return (
          <div
            key={item.label}
            className={`flex flex-col flex-1 items-center justify-start py-2 px-4 rounded-md text-center text-sm font-medium text-neutral-700`}
            onClick={() => {
              if (item.handleClick) {
                item.handleClick();
              } else {
                window.location.href = item.path;
              }
            }}
          >
            <img
              className="h-5 w-5"
              src={`/bottom-bar/${
                isActive ? `${item.icon}-active` : item.icon
              }.png`}
            />
            <span className="mt-1 font-normal">{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}
