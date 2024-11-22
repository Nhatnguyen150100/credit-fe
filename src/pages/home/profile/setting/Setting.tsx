import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../../../lib/reducer/userSlice";

export default function Setting() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setUser(undefined));
    navigate("/login");
  };

  return (
    <div className="w-screen d-flex flex-col justify-center items-start space-y-5">
      <div className="w-full bg-white px-3 py-3 justify-start items-center space-x-5" onClick={() => {navigate(-1)}}>
        <ArrowLeftOutlined />
        <span className="text-sm">Trở lại</span>
      </div>
      <div className="w-full flex flex-col justify-start items-center space-y-5 min-h-[120px]">
        <div className="flex flex-col justify-start items-center w-full space-y-3">
          <img className="h-[56px]" src="/cat-credit.jpg" alt="logo" />
          <h2 className="text-lg">Cat credit</h2>
          <h2 className="text-lg">V1.6.0</h2>
        </div>
      </div>
      <div className="flex flex-row px-5 justify-center items-center">
        <Button
          className="w-[220px] py-2"
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
