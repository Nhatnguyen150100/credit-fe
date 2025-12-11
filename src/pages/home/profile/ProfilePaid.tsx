import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IRootState } from "../../../lib/store";
import Visibility from "../../../components/visibility";
import maskNumber from "../../../utils/mask_number";
import DEFINE_ROUTER from "../../../constants/router-define";
import { formatCurrency } from "../../../utils/format-money";
import { formatDate } from "../../../utils/day-format";

export default function ProfilePaid() {
  const user = useSelector((state: IRootState) => state.user);
  const navigate = useNavigate();

  const displayName =
    user?.name || (user?.phone_number ? maskNumber(user.phone_number) : "Bạn");

  const dueDate = user?.date_payable ?? new Date("2025-12-31");

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
          Khoản vay của bạn đã được ghi nhận thanh toán thành công. Cảm ơn bạn
          đã hợp tác cùng chúng tôi.
        </p>
        <Visibility visibility={user?._id}>
          <button
            type="button"
            className="text-[13px] font-semibold text-theme-orangish-dark underline text-end leading-4 mt-3"
            onClick={() =>
              navigate(
                DEFINE_ROUTER.information.replace(":id", user?._id ?? "")
              )
            }
          >
            Xem chi tiết đơn vay
          </button>
        </Visibility>
      </div>

      <div className="pb-4 space-y-4">
        <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mb-1 text-xs uppercase tracking-wide text-theme-dark">
                Khoản vay đã tất toán
              </p>
              <p className="m-0 text-3xl font-semibold text-text-color">
                {formatCurrency(user?.amount_payable ?? 0)}
              </p>
              <p className="m-0 mt-1 text-sm text-secondary-link">
                Số tiền đã được thanh toán thành công
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-account-theme-active px-3 py-1 text-xs font-semibold text-white text-nowrap">
              Đã thanh toán
            </span>
          </div>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-secondary-link">Ngày đến hạn</span>
              <span className="font-medium text-text-color">
                {dueDate ? formatDate(dueDate, "DD.MM.YYYY") : "--"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-secondary-link">Mã hồ sơ</span>
              <span className="font-medium text-text-color truncate max-w-[200px] text-right">
                {user?._id || "--"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-secondary-link">Tài khoản thanh toán</span>
              <span className="font-medium text-text-color truncate max-w-[200px] text-right">
                {maskNumber(user?.phone_number ?? "") || "--"}
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-theme-sand-light p-4 text-sm leading-relaxed text-text-color">
          <p className="mb-2 font-semibold text-text-color">
            Hẹn gặp lại bạn ở khoản vay tiếp theo
          </p>
          <p className="mb-1">
            Chúng tôi đã dừng tất cả nhắc nhở cho đơn vay này. Nếu cần hỗ trợ
            thêm hoặc muốn thực hiện khoản vay mới, vui lòng liên hệ đội ngũ
            chăm sóc khách hàng.
          </p>
          <p className="m-0">
            Bạn có thể xem lại biên nhận hoặc thông tin đơn vay ở mục{" "}
            <span className="font-semibold">"Xem chi tiết đơn vay"</span> bên
            trên.
          </p>
        </div>
      </div>
    </>
  );
}
