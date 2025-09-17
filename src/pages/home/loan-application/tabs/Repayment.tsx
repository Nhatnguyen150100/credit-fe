import { IInfo } from "../../../../types/info";
import Visibility from "../../../../components/visibility";
import { Button, Empty } from "antd";
import CommonElement from "../base/CommonElement";
import { formatCurrency } from "../../../../utils/format-money";
import { formatDate } from "../../../../utils/day-format";
import { useNavigate } from "react-router-dom";
import DEFINE_ROUTER from "../../../../constants/router-define";

interface IProps {
  userInfo: IInfo | null;
}

export default function Repayment({ userInfo }: IProps) {
  const navigate = useNavigate();
  return (
    <div className="w-screen flex flex-col justify-start items-center space-y-3 bg-gray-100 sm:w-full">
      <Visibility
        visibility={userInfo?._id}
        suspenseComponent={<Empty description="Không có dữ liệu" />}
      >
        <CommonElement
          logo="/logo.jpg"
          listItem={[
            {
              id: 1,
              label: "Trạng thái",
              value: (
                <span className="text-green-800">
                  Khoản vay đã được giải quyết
                </span>
              ),
            },
            {
              id: 2,
              label: "Số tiền phải trả",
              value: formatCurrency(userInfo?.amount_payable ?? 0),
            },
            {
              id: 3,
              label: "Thời hạn cho vay",
              value: (
                <span className="text-gray-500">
                  {formatDate(userInfo?.loan_date ?? "", "DD-MM-YYYY")}
                </span>
              ),
            },
          ]}
          button={
            <Button
              type="primary"
              variant="filled"
              className="rounded-md py-2 w-full"
              onClick={() => navigate(DEFINE_ROUTER.home)}
            >
              Mượn cái khác
            </Button>
          }
        />
      </Visibility>
    </div>
  );
}
