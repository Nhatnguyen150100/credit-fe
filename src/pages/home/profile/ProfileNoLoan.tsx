import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileTextOutlined, HomeOutlined } from "@ant-design/icons";
import { IRootState } from "../../../lib/store";
import maskNumber from "../../../utils/mask_number";
import DEFINE_ROUTER from "../../../constants/router-define";
import Visibility from "../../../components/visibility";

export default function ProfileNoLoan() {
  const user = useSelector((state: IRootState) => state.user);
  const loanAmount = useSelector(
    (state: IRootState) => state.loanApplication.loanAmount
  );
  const navigate = useNavigate();

  const displayName =
    user?.name || (user?.phone_number ? maskNumber(user.phone_number) : "Bạn");

  const hasPendingLoan = loanAmount !== null && loanAmount !== undefined;

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
          Hiện tại bạn chưa có thông tin khoản vay nào trong hệ thống.
        </p>
      </div>
      <div className="px-4 mt-6 space-y-4">
        <div className="rounded-2xl bg-white px-4 py-6 shadow-sm text-center">
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-theme-cloudless flex items-center justify-center mb-3">
              <FileTextOutlined className="text-3xl text-theme-orangish-dark" />
            </div>
            <h3 className="text-lg font-semibold text-text-color mb-2">
              Chưa có thông tin vay
            </h3>
            <p className="text-sm text-secondary-link leading-relaxed max-w-[300px]">
              Bạn chưa có khoản vay nào được ghi nhận trong hệ thống. Vui lòng
              thực hiện đăng ký khoản vay mới hoặc kiểm tra khoản vay đang được
              xét duyệt.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => navigate(DEFINE_ROUTER.home)}
            className="w-full rounded-full bg-primary-color-dark text-white py-3 h-12 flex items-center justify-center gap-2 font-semibold hover:opacity-90 transition-all"
          >
            <HomeOutlined className="text-base" />
            <span>Quay lại trang chủ</span>
          </button>

          <Visibility visibility={hasPendingLoan}>
            <button
              type="button"
              onClick={() => navigate(DEFINE_ROUTER.loanApplication)}
              className="w-full rounded-full bg-theme-orangish-dark text-white py-3 h-12 flex items-center justify-center gap-2 font-semibold hover:opacity-90 transition-all"
            >
              <FileTextOutlined className="text-base" />
              <span>Kiểm tra khoản vay đang xét duyệt</span>
            </button>
          </Visibility>
        </div>

        <div className="rounded-2xl bg-theme-sand-light px-4 py-4 text-sm leading-relaxed text-text-color">
          <p className="mb-2 font-semibold text-text-color">
            Hướng dẫn đăng ký khoản vay
          </p>
          <p className="mb-1">
            Để đăng ký khoản vay mới, vui lòng quay lại trang chủ và thực hiện
            các bước sau:
          </p>
          <ol className="list-decimal list-inside space-y-1 text-secondary-link">
            <li>Chọn số tiền vay mong muốn</li>
            <li>Đọc và đồng ý với điều khoản và chính sách bảo mật</li>
            <li>Nhấn nút "Vay ngay" để hoàn tất đăng ký</li>
          </ol>
        </div>
      </div>
    </>
  );
}
