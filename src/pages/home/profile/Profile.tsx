import {
  BankOutlined,
  IdcardOutlined,
  PhoneOutlined,
  HomeOutlined,
  CompassOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

import { IRootState } from "../../../lib/store";
import maskNumber from "../../../utils/mask_number";
import { Button } from "antd";
import { setLoanAmount } from "../../../lib/reducer/loanApplicationSlice";
import { setUser } from "../../../lib/reducer/userSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const user = useSelector((state: IRootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displayName =
    user?.name || (user?.phone_number ? maskNumber(user.phone_number) : "Bạn");

  const basicInfo = [
    { label: "Họ và tên", value: user?.name || "--", icon: <IdcardOutlined /> },
    {
      label: "Số điện thoại",
      value: maskNumber(user?.phone_number ?? "") || "--",
      icon: <PhoneOutlined />,
    },
    {
      label: "Địa chỉ",
      value: user?.address || "Chưa cập nhật",
      icon: <CompassOutlined />,
    },
    {
      label: "Công ty",
      value: user?.company || "Chưa cập nhật",
      icon: <HomeOutlined />,
    },
    { label: "Mã hồ sơ", value: user?._id || "--", icon: <IdcardOutlined /> },
  ];

  const accountInfo = [
    {
      label: "Ngân hàng thụ hưởng",
      value: user?.bank_name || "Chưa cập nhật",
      icon: <BankOutlined />,
    },
    {
      label: "Số tài khoản nhận tiền",
      value:
        user?.receiving_account_number || "Chưa cập nhật",
      icon: <BankOutlined />,
    },
  ];

  const handleLogout = () => {
    dispatch(setUser(undefined));
    dispatch(setLoanAmount(null));
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="min-h-screen w-full pb-10 sm:max-w-[500px]">
        <div className="rounded-b-3xl bg-theme-cloudless-light px-4 pt-6 pb-7">
          <p className="text-sm font-semibold text-theme-orangish-dark mb-1">
            Hồ sơ cá nhân
          </p>
          <p className="text-2xl font-semibold text-text-color mb-1">
            Xin chào, {displayName}
          </p>
          <p className="text-sm leading-relaxed text-secondary-link">
            Kiểm tra và cập nhật thông tin của bạn để nhận tiền nhanh chóng và
            an toàn hơn.
          </p>
        </div>

        <div className="px-4 mt-3 space-y-5">
          <div className="space-y-2">
            {basicInfo.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center text-theme-orangish-dark">
                    {item.icon}
                  </span>
                  <div>
                    <p className="m-0 text-xs text-secondary-link">
                      {item.label}
                    </p>
                    <p className="m-0 text-sm font-semibold text-text-color">
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <>
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-theme-sand-light">
                <BankOutlined className="text-theme-dark" />
              </span>
              <div>
                <p className="m-0 text-sm font-semibold text-text-color">
                  Tài khoản nhận tiền
                </p>
                <p className="m-0 text-xs text-secondary-link">
                  Vui lòng dùng tài khoản chính chủ để tránh chậm trễ thanh toán
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {accountInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center text-theme-orangish-dark">
                    {item.icon}
                  </span>
                  <div>
                    <p className="m-0 text-xs text-secondary-link">
                      {item.label}
                    </p>
                    <p className="m-0 text-sm font-semibold text-text-color">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
          <Button
            className="w-full h-[42px] rounded-full text-base font-semibold bg-[#FF8A3D] hover:bg-[#ff7a22] focus:bg-[#ff7a22] border-none text-white mb-8 mt-5 gap-3"
            type="primary"
            onClick={handleLogout}
          >
            <LogoutOutlined />
            <span>Đăng xuất</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
