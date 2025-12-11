import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileTextOutlined, CreditCardOutlined } from "@ant-design/icons";

import { IRootState } from "../../../lib/store";
import Visibility from "../../../components/visibility";
import maskNumber from "../../../utils/mask_number";
import DEFINE_ROUTER from "../../../constants/router-define";
import { formatCurrency } from "../../../utils/format-money";
import { formatDate } from "../../../utils/day-format";
import { Button } from "antd";

export default function ProfileUnpaid() {
  const user = useSelector((state: IRootState) => {
    return state.user;
  });
  const navigate = useNavigate();

  const displayName =
    user?.name || (user?.phone_number ? maskNumber(user.phone_number) : "Bạn");

  const dueDate = user?.date_payable ?? new Date("2025-12-31");
  const daysLeft =
    dueDate && dayjs(dueDate).isValid()
      ? dayjs(dueDate).diff(dayjs(), "day")
      : undefined;

  const renderDueBadge = () => {
    if (daysLeft === undefined) return null;

    if (daysLeft > 0) {
      return (
        <span className="rounded-full bg-account-theme-active px-3 py-1 text-xs font-semibold text-white">
          Còn {daysLeft} ngày
        </span>
      );
    }

    if (daysLeft === 0) {
      return (
        <span className="rounded-full bg-account-theme-today px-3 py-1 text-xs font-semibold text-white">
          Đến hạn hôm nay
        </span>
      );
    }

    return (
      <span className="rounded-full bg-account-theme-overdue px-3 py-1 text-xs font-semibold text-white">
        Quá hạn {Math.abs(daysLeft)} ngày
      </span>
    );
  };

  return (
    <>
      <div className="rounded-b-3xl pb-7">
        <div className="flex items-center flex-wrap mb-1 gap-2">
          <p className="text-2xl font-medium tracking-wide text-graphite">
            Xin chào,
          </p>
          <Visibility visibility={user?.phone_number}>
            <p className="text-2xl font-semibold text-graphite truncate max-w-[320px]">
              {displayName}
            </p>
          </Visibility>
        </div>
        <p className="text-sm leading-relaxed text-secondary-link">
          Vui lòng thanh toán đúng hạn để nhận khoản vay lớn hơn lần sau nhé!
        </p>
      </div>

      <div className="pb-5">
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <p className="mb-1 text-xs tracking-wide text-theme-dark">
                Số tiền cần thanh toán
              </p>
              <p className="m-0 text-3xl font-semibold text-text-color text-nowrap">
                {formatCurrency(user?.amount_payable ?? 0)}
              </p>
            </div>
            {renderDueBadge()}
          </div>

          <div className="flex flex-col items-start justify-start ga-1">
            <p className="mb-0.5 text-xs text-theme-dark">Trả trước</p>
            <p className="m-0 font-normal text-text-color text-2xl">
              {dueDate ? formatDate(dueDate, "DD.MM.YYYY") : "--"}
            </p>
          </div>
        </div>
      </div>

      <Visibility visibility={user?._id}>
        <div className="px-4 mt-8 space-y-4">
          <Button
            type="primary"
            onClick={() =>
              navigate(
                DEFINE_ROUTER.information.replace(":id", user?._id ?? "")
              )
            }
            className="h-[44px] w-full rounded-full text-sm font-semibold flex items-center justify-center gap-2"
          >
            <FileTextOutlined />
            <span>Thông tin chi tiết đơn vay</span>
          </Button>
          <Button
            onClick={() =>
              navigate(DEFINE_ROUTER.payment.replace(":id", user?._id ?? ""))
            }
            className="!bg-theme-orangish-dark border-none h-[44px] w-full rounded-full text-sm font-semibold flex items-center justify-center gap-2"
          >
            <CreditCardOutlined className="text-white" />
            <span className="text-white">Lập tức thanh toán</span>
          </Button>
        </div>
      </Visibility>
      <div className="mt-4 rounded-2xl bg-theme-sand-light px-4 py-3 text-[13px] leading-relaxed text-text-color">
        <p className="m-0">
          Lưu ý: tài khoản thanh toán của mỗi đơn đặt hàng khác nhau, hãy nhấp
          vào <span className="font-semibold">"Lập tức thanh toán"</span> để xem
          tài khoản thanh toán của đơn hiện tại. Vui lòng kiểm tra kỹ thông tin
          trước khi chuyển khoản.
        </p>
      </div>
      <div className="mt-3 mb-10 rounded-2xl bg-theme-cloudless-light px-4 py-3 text-[13px] leading-relaxed">
        <p className="m-0">
          Nếu có bất kỳ câu hỏi nào khác, vui lòng liên hệ với bộ phận hỗ trợ
          qua số điện thoại hiển thị trong ứng dụng để được giải đáp nhanh
          chóng.
        </p>
      </div>
    </>
  );
}
