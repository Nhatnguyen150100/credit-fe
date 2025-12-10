import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileTextOutlined, HomeOutlined, ClockCircleOutlined } from "@ant-design/icons";
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
  const navigate = useNavigate();

  const displayName =
    user?.name || (user?.phone_number ? maskNumber(user.phone_number) : "Bạn");

  if (!loanAmount) {
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
              Hiện tại bạn chưa có khoản vay nào đang chờ xét duyệt trong hệ thống.
            </p>
          </div>

          <div className="px-4 mt-6 space-y-4">
            <div className="rounded-2xl bg-white px-4 py-6 shadow-sm text-center">
              <div className="flex flex-col items-center mb-4">
                <div className="w-20 h-20 rounded-full bg-theme-cloudless flex items-center justify-center mb-4">
                  <ClockCircleOutlined className="text-4xl text-theme-orangish-dark" />
                </div>
                <h3 className="text-xl font-semibold text-text-color mb-2">
                  Chưa có khoản vay đang xét duyệt
                </h3>
                <p className="text-sm text-secondary-link leading-relaxed max-w-[320px]">
                  Bạn chưa có khoản vay nào được ghi nhận và đang chờ xét duyệt trong hệ thống. 
                  Vui lòng thực hiện đăng ký khoản vay mới để bắt đầu quy trình.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => navigate(DEFINE_ROUTER.home)}
                className="w-full rounded-full bg-theme-orangish-dark text-white py-3 h-12 flex items-center justify-center gap-2 font-semibold hover:opacity-90 transition-all shadow-sm"
              >
                <HomeOutlined className="text-base" />
                <span>Quay lại trang chủ</span>
              </button>
            </div>

            <div className="rounded-2xl bg-theme-sand-light px-4 py-4 text-sm leading-relaxed text-text-color">
              <p className="mb-2 font-semibold text-text-color">
                Hướng dẫn đăng ký khoản vay
              </p>
              <p className="mb-2">
                Để đăng ký khoản vay mới và bắt đầu quy trình xét duyệt, vui lòng thực hiện các bước sau:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-secondary-link mb-2">
                <li>Quay lại trang chủ và chọn số tiền vay mong muốn</li>
                <li>Điền đầy đủ thông tin cá nhân theo yêu cầu</li>
                <li>Đọc và đồng ý với điều khoản và chính sách bảo mật</li>
                <li>Nhấn nút "Vay ngay" để hoàn tất đăng ký</li>
              </ol>
              <p className="mb-1">
                Sau khi đăng ký thành công, khoản vay của bạn sẽ được ghi nhận và hiển thị tại trang này với trạng thái "Đang chờ xét duyệt".
              </p>
              <p className="m-0">
                Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ đội ngũ chăm sóc khách hàng để được hỗ trợ.
              </p>
            </div>

            <div className="rounded-2xl bg-theme-cloudless-light px-4 py-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-theme-cloudless flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileTextOutlined className="text-lg text-theme-orangish-dark" />
                </div>
                <div className="flex-1">
                  <p className="mb-1 text-sm font-semibold text-text-color">
                    Thông tin bổ sung
                  </p>
                  <p className="text-xs text-secondary-link leading-relaxed">
                    Thời gian xét duyệt thường từ 1-3 ngày làm việc. Bạn sẽ nhận được thông báo 
                    ngay khi có kết quả xét duyệt qua số điện thoại đã đăng ký.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

