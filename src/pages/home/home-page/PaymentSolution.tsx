import * as React from "react";
import { formatCurrency } from "../../../utils/format-money";

const DEFINE_ITEM = [
  "Công dân Việt Nam từ 18-50 tuổi",
  "Có công việc ổn định và khả năng trả nợ",
  "Có tài khoản ngân hàng",
];

export default function PaymentSolution() {
  return (
    <div className="p-3 bg-white rounded-lg flex flex-col justify-start items-start space-y-3">
      <h2>Nộp đơn vay</h2>
      <ul className="list-disc ps-4">
        {DEFINE_ITEM.map((item, index) => (
          <li key={index} className="text-sm font-light">
            {item}
          </li>
        ))}
      </ul>
      <span className="text-sm font-light">
        {`Khoản vay: Từ ${formatCurrency(1000000)} đến vay: ${formatCurrency(
          30000000
        )}. Kỳ hạn vay: 91 -> 180 ngày. Lãi suất vay: cao nhất 24%/năm. Phí kiểm soát rủi ro`}
      </span>
      <span className="text-sm font-light">
        {`*Ví dụ về trường hợp cho vay: Nếu bạn vay ${formatCurrency(
          1000000
        )}, lãi suất là 10% và thời hạn vay là 91 ngày, vậy số tiền phải trả là ${formatCurrency(
          1024931
        )} (cụ thể là: ${(1000000).toLocaleString()}*10% / 365 *91 + ${(1000000).toLocaleString()})`}
      </span>
    </div>
  );
}
