import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { IRootState } from "../../../lib/store";
import { formatCurrency } from "../../../utils/format-money";
import { formatDate } from "../../../utils/day-format";
import maskNumber from "../../../utils/mask_number";
import Visibility from "../../../components/visibility";
import DEFINE_ROUTER from "../../../constants/router-define";

export default function NewLoanPending() {
  const loanAmount = useSelector(
    (state: IRootState) => state.loanApplication.loanAmount
  );
  const user = useSelector((state: IRootState) => state.user);

  if (!loanAmount) {
    return <Navigate to={DEFINE_ROUTER.home} replace />;
  }

  const displayName =
    user?.name || (user?.phone_number ? maskNumber(user.phone_number) : "Bạn");

  const registrationDate = new Date().toISOString();

  return (
    <div className="flex w-full items-center justify-center">
      <div className="min-h-screen w-full pb-8 sm:max-w-[450px]">
        <div className="rounded-b-3xl bg-theme-orangish-light-ultra px-4 pt-6 pb-7">
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
            Yêu cầu vay của bạn đã được ghi nhận thành công và đang chờ xét duyệt.
            Chúng tôi sẽ thông báo kết quả cho bạn trong thời gian sớm nhất.
          </p>
        </div>

        <div className="px-4 mt-6 space-y-4">
          <div className="rounded-2xl bg-white px-4 py-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-theme-dark">
                  Số tiền vay đã đăng ký
                </p>
                <p className="m-0 text-3xl font-semibold text-text-color">
                  {formatCurrency(loanAmount)}
                </p>
                <p className="m-0 mt-1 text-sm text-secondary-link">
                  Khoản vay đang chờ xét duyệt
                </p>
              </div>
              <span className="flex items-center gap-1 rounded-full bg-theme-orangish-dark px-3 py-1 text-xs font-semibold text-white text-nowrap">
                Đang chờ
              </span>
            </div>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-secondary-link">Ngày đăng ký</span>
                <span className="font-medium text-text-color">
                  {formatDate(registrationDate, "DD.MM.YYYY")}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-secondary-link">Trạng thái</span>
                <span className="font-medium text-text-color">
                  Chờ xét duyệt
                </span>
              </div>
              <Visibility visibility={user?.phone_number}>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-link">
                    Số điện thoại đăng ký
                  </span>
                  <span className="font-medium text-text-color truncate max-w-[200px] text-right">
                    {maskNumber(user?.phone_number ?? "") || "--"}
                  </span>
                </div>
              </Visibility>
              <Visibility visibility={user?._id}>
                <div className="flex items-center justify-between">
                  <span className="text-secondary-link">Mã hồ sơ</span>
                  <span className="font-medium text-text-color truncate max-w-[200px] text-right">
                    {user?._id || "--"}
                  </span>
                </div>
              </Visibility>
            </div>
          </div>

          <div className="rounded-2xl bg-theme-sand-light px-4 py-4 text-sm leading-relaxed text-text-color">
            <p className="mb-2 font-semibold text-text-color">
              Thông tin quan trọng
            </p>
            <p className="mb-1">
              Yêu cầu vay của bạn đã được ghi nhận thành công. Chúng tôi sẽ xét
              duyệt và thông báo kết quả cho bạn trong thời gian sớm nhất.
            </p>
            <p className="mb-1">
              Vui lòng kiểm tra thông tin và chờ phản hồi từ hệ thống. Bạn sẽ
              nhận được thông báo khi có kết quả xét duyệt.
            </p>
            <p className="m-0">
              Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ đội ngũ chăm sóc khách
              hàng để được hỗ trợ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

