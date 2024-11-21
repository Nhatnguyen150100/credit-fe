import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import * as React from "react";
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
    <div className="w-screen d-flex flex-col justify-start items-start space-y-5">
      <div className="w-full bg-white px-3 py-1 justify-start items-center">
        <LeftOutlined />
        <span>Trở lại</span>
      </div>
      <div className="w-full flex flex-col justify-start items-center space-y-5 min-h-[320px]">
        <div className="flex flex-col justify-start items-center w-full space-y-3">
          <img className="h-[56px]" src="/cat-credit.jpg" alt="logo" />
          <h2 className="text-lg">Cat credit</h2>
          <h2 className="text-lg">V1.6.0</h2>
        </div>
      </div>
      <Button type="primary" variant="filled" onClick={handleLogout}>
        Đăng xuất
      </Button>
    </div>
  );
}
