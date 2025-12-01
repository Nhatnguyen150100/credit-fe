import { useState } from "react";

export default function ScamWarningSection() {
  const [showScamDetails, setShowScamDetails] = useState(false);

  return (
    <section className="w-full rounded-[24px] bg-[#FFE4C4] px-5 py-6 mt-6 shadow-sm">
      <div className="mb-4 flex items-start space-x-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2B600] text-[16px] font-bold text-white">
          !
        </div>
        <div className="flex-1">
          <h2 className="text-[14px] font-semibold uppercase tracking-[0.04em] text-[#20273A]">
            Cảnh báo các hình thức lừa đảo!
          </h2>
        </div>
      </div>

      <p className="text-[11px] leading-relaxed text-[#5A6478] mb-3">
        Xin lưu ý rằng hiện nay có nhiều kẻ lừa đảo đang cố lừa Quý khách
        thanh toán khoản vay vào các tài khoản ngân hàng giả mạo dưới hình
        thức là đối tác của chúng tôi hoặc các tài khoản cá nhân. Nếu Quý
        khách thanh toán vào các tài khoản này, khoản vay của Quý khách sẽ
        không được đóng trên hệ thống của chúng tôi và Quý khách sẽ chỉ mất
        tiền.
      </p>

      {showScamDetails && (
        <div className="flex flex-col space-y-3">
          <h3 className="text-base font-semibold text-[#20273A]">
            Làm thế nào để Quý khách có thể tránh được điều này?
          </h3>

          <p className="text-[11px] leading-relaxed text-[#5A6478]">
            Quý khách vui lòng{" "}
            <span className="font-semibold">
              không bao giờ chia sẻ mã OTP
            </span>{" "}
            của mình với bất kỳ ai, ngay cả khi họ tự nhận là nhân viên của
            CayVang. Nhân viên của chúng tôi sẽ không bao giờ yêu cầu Quý
            khách cung cấp mã OTP.
          </p>

          <p className="text-[11px] leading-relaxed text-[#5A6478]">
            <span className="font-semibold">
              Không chuyển tiền vào tài khoản cá nhân
            </span>{" "}
            của những người tự xưng là đối tác cho vay. Quý khách chỉ nên
            thanh toán thông qua các kênh thanh toán chính thức trên hệ thống
            CayVang.
          </p>

          <p className="text-[11px] leading-relaxed text-[#5A6478]">
            <span className="font-semibold">
              Đảm bảo rằng Quý khách đang liên lạc với đại diện chính thức của
              CayVang
            </span>
            . Kiểm tra kỹ đường dẫn trang web, tên ứng dụng và thông tin trên
            các kênh truyền thông chính thức trước khi cung cấp bất kỳ thông
            tin cá nhân hay chuyển khoản nào.
          </p>
        </div>
      )}

      {showScamDetails ? (
        <button
          className="text-[11px] font-semibold text-theme-orangish-dark underline"
          onClick={() => setShowScamDetails(false)}
        >
          Ít hơn
        </button>
      ) : (
        <button
          className="text-[11px] font-semibold text-theme-orangish-dark underline"
          onClick={() => setShowScamDetails(true)}
        >
          Tìm hiểu thêm
        </button>
      )}
    </section>
  );
}

