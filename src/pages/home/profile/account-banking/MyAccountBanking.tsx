import { useSelector } from "react-redux";
import { IRootState } from "../../../../lib/store";

export default function MyAccountBanking() {
  const user = useSelector((state: IRootState) => state.user);

  return (
    <div className="flex flex-col justify-start items-center bg-gray-100 w-full">
      <div className="flex flex-col justify-start items-start space-y-5 mt-5 w-full">
        <div className="px-3 pb-3 flex flex-row justify-start items-center space-x-5 border-b w-full">
          <span className="text-sm text-gray-700">Ngân hàng nhận tiền</span>
          <span className="uppercase text-base font-medium">
            {user?.bank_name}
          </span>
        </div>
        <div className="px-3 pb-3 flex flex-row justify-start items-center space-x-5 border-b w-full">
          <span className="text-sm text-gray-700">Số tài khoản nhận tiền</span>
          <span className="uppercase text-base font-medium">
            {user?.receiving_account_number}
          </span>
        </div>
      </div>
    </div>
  );
}
