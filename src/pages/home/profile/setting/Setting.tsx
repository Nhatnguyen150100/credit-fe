import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setUser } from "../../../../lib/reducer/userSlice";
import { IRootState } from "../../../../lib/store";
import DEFINE_ROUTER from "../../../../constants/router-define";
import { setLoanAmount } from "../../../../lib/reducer/loanApplicationSlice";

export default function Setting() {
  const user = useSelector((state: IRootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!(user?._id || user?.phone_number )) {
    return <Navigate to={DEFINE_ROUTER.login} replace />;
  }

  const handleLogout = () => {
    dispatch(setUser(undefined));
    dispatch(setLoanAmount(null));
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="w-screen d-flex flex-col justify-center items-start space-y-5 sm:max-w-[450px] sm:border">
      <div
        className="w-full bg-white px-3 py-3 justify-start items-center space-x-5"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowLeftOutlined />
        <span className="text-sm">Trở lại</span>
      </div>
      <div className="w-full flex flex-col justify-start items-center space-y-5 min-h-[80px]">
        <div className="flex flex-col justify-start items-center w-full space-y-2">
          <img className="h-[56px]" src="/vaycash.jpg" alt="logo" />
          <h2 className="text-lg">V1.6.0</h2>
        </div>
      </div>
      <div className="flex flex-row px-5 justify-center items-center">
        <Button
          className="w-[220px] py-2 primary-bg"
          type="primary"
          variant="solid"
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
