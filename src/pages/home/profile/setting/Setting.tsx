import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setUser } from "../../../../lib/reducer/userSlice";
import { IRootState } from "../../../../lib/store";
import DEFINE_ROUTER from "../../../../constants/router-define";
import { setLoanAmount } from "../../../../lib/reducer/loanApplicationSlice";
import { APP_NAME } from "../../../../constants/global";

export default function Setting() {
  const user = useSelector((state: IRootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!(user?._id || user?.phone_number)) {
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
    <div className="w-screen d-flex flex-col justify-center items-start space-y-5 sm:max-w-[450px] sm:border mt-20">
      <div className="w-full flex flex-col justify-start items-center space-y-5 min-h-[120px]">
        <div className="flex flex-col justify-start items-center w-full space-y-3">
          <img className="h-[56px]" src="/logo.jpg" alt="logo" />
          <h2 className="text-lg">{APP_NAME}</h2>
          <h2 className="text-lg">V1.6.0</h2>
        </div>
      </div>
      <div className="flex flex-row px-5 justify-center items-center">
        <Button
          className="w-[220px] h-[52px] rounded-[12px] text-base font-semibold bg-[#FF8A3D] hover:bg-[#ff7a22] focus:bg-[#ff7a22] border-none text-white mb-8 mt-5"
          type="primary"
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
