import { useSelector } from "react-redux";
import { IRootState } from "../../../lib/store";
import Visibility from "../../../components/visibility";
import maskNumber from "../../../utils/mask_number";
import { Button, List } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  BugOutlined,
  CreditCardOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import DEFINE_ROUTER from "../../../constants/router-define";

export default function Profile() {
  const user = useSelector((state: IRootState) => state.user);
  const navigate = useNavigate();

  const LoginButton = (
    <Button
      type="text"
      className="text-white text-base"
      onClick={() => {
        navigate(DEFINE_ROUTER.login);
      }}
    >
      Đăng nhập
    </Button>
  );

  return (
    <div className="w-full flex flex-col justify-start items-start">
      <div className="bg-blue-700 w-full flex flex-col justify-center items-center h-[220px] space-y-3">
        <img className="h-[56px]" src="/user/user_default.png" />
        <Visibility visibility={user?.phone_number} suspenseComponent={LoginButton}>
          <span className="text-sm text-white">
            {maskNumber(user!.phone_number)}
          </span>
        </Visibility>
      </div>
      <List
        className="w-full"
        bordered
        dataSource={[
          {
            title: "Quản lý thẻ ngân hàng",
            icon: <CreditCardOutlined />,
            path: DEFINE_ROUTER.myBank,
          },
          {
            title: "Trung tâm trợ giúp",
            icon: <QuestionCircleOutlined />,
            path: "#",
          },
          {
            title: "Chính sách bảo mật",
            icon: <BugOutlined />,
            path: DEFINE_ROUTER.term,
          },
          {
            title: "Thiết lập",
            icon: <SettingOutlined />,
            path: DEFINE_ROUTER.setting,
          },
        ]}
        renderItem={(item, _) => (
          <List.Item>
            <Link
              to={item.path}
              className="flex flex-row justify-start items-center space-x-3"
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </List.Item>
        )}
      />
    </div>
  );
}
