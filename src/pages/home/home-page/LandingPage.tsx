import { PhoneOutlined } from "@ant-design/icons";

export default function LandingPage() {
  return (
    <div className="flex w-full justify-center bg-white">
      {/* Khung mobile */}
      <div className="flex h-screen w-screen max-w-[430px] flex-col items-center">
        {/* Header */}
        <header className="flex w-full items-center justify-between bg-white px-4 pt-4">
          {/* Logo + wordmark */}
          <div className="flex items-center space-x-3">
            <img
              src="/cayvang.svg"
              alt="CayVang logo"
              className="h-[30px] w-[30px]"
            />
            <span className="text-[18px] tracking-[0.28em] text-[#20273A]">
              CAYVANG
            </span>
          </div>

          {/* Đăng nhập + menu */}
          <div className="flex items-center space-x-4">
            <button className="rounded-[12px] bg-[#FDF5C1] p-3 text-base text-[#2D2D2F]">
              Đăng nhập
            </button>
            <button className="flex h-[64px] w-[64px] items-center justify-center rounded-[26px] bg-[#FFF6C6]">
              <div className="space-y-2">
                <span className="block h-[3px] w-8 rounded-full bg-[#272933]" />
                <span className="block h-[3px] w-8 rounded-full bg-[#272933]" />
                <span className="block h-[3px] w-8 rounded-full bg-[#272933]" />
              </div>
            </button>
          </div>
        </header>

        {/* Nội dung */}
        <main className="flex w-full flex-col space-y-5 px-4 pb-10 pt-5">
          {/* Hero title */}
          <section className="w-full">
            <h1 className="text-[20px] font-semibold leading-snug text-[#20273A]">
              Vay Nhanh &amp; Dễ Dàng
              <br />
              Hơn Với CayVang
            </h1>
          </section>

          {/* Card khoản vay + slider */}
          <section className="w-full rounded-2xl bg-white pb-4 shadow-sm">
            <div className="rounded-t-2xl bg-[#F4F8FF] px-4 pb-4 pt-3">
              <div className="mb-3 flex items-center justify-between text-[11px] text-gray-500">
                <span>Khoản vay</span>
                <span>Số tiền trả</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span className="text-[22px] font-semibold text-[#20273A]">
                  1 500 000₫
                </span>
                <span className="text-[13px] font-semibold text-[#20273A]">
                  3 000 000₫
                </span>
              </div>
              {/* Thanh slider mô phỏng */}
              <div className="space-y-1">
                <div className="h-[6px] w-full rounded-full bg-[#FFE9B0]">
                  <div className="h-[6px] w-1/2 rounded-full bg-[#F2B600]" />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400">
                  <span>500 000₫</span>
                  <span>5 000 000₫</span>
                </div>
              </div>
            </div>
            {/* Dòng tổng cộng / đóng hàng tháng */}
            <div className="flex items-center justify-between px-4 pt-3 text-[11px]">
              <div className="flex flex-col">
                <span className="text-gray-500">Đóng hàng tháng</span>
                <span className="mt-1 text-[15px] font-semibold text-[#20273A]">
                  1 500 000₫
                </span>
              </div>
              <button className="rounded-full bg-[#F2B600] px-4 py-[8px] text-[11px] font-semibold text-white">
                Đăng ký ngay
              </button>
            </div>
          </section>

          {/* Số điện thoại + nút gọi */}
          <section className="space-y-2">
            <div className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-2.5 shadow-sm">
              <div className="flex flex-col text-[11px]">
                <span className="text-gray-400">Số điện thoại</span>
                <span className="mt-[2px] text-[13px] font-semibold text-[#20273A]">
                  0XX XXX XXXX
                </span>
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F2B600] text-white">
                <PhoneOutlined className="text-sm" />
              </button>
            </div>
            <p className="rounded-lg bg-[#FFF0F0] px-3 py-2 text-[10px] leading-relaxed text-[#E45858]">
              Vui lòng sử dụng số điện thoại chính chủ, trùng với số điện thoại
              đăng ký tài khoản ngân hàng để quy trình xét duyệt diễn ra nhanh
              chóng và chính xác.
            </p>
          </section>

          {/* Bong bóng chat cố định */}
          <button className="fixed bottom-20 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#247CFF] text-lg text-white shadow-lg">
            ?
          </button>

          {/* Cảnh báo lừa đảo */}
          <section className="w-full rounded-2xl bg-[#FFE4C4] px-4 py-4">
            <div className="mb-2 flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[13px] font-bold text-[#F2B600]">
                !
              </div>
              <h2 className="text-[13px] font-semibold text-[#20273A]">
                Cảnh báo các hình thức lừa đảo
              </h2>
            </div>
            <p className="text-[11px] leading-relaxed text-[#5A6478]">
              Không cung cấp mã OTP, mật khẩu hay thông tin đăng nhập cho bất kỳ
              ai, kể cả người tự xưng là nhân viên CayVang. Tuyệt đối không
              chuyển tiền trước cho bên thứ ba để được phê duyệt khoản vay. Khi
              cần hỗ trợ, vui lòng liên hệ qua số hotline chính thức trên hệ
              thống.
            </p>
          </section>

          {/* Số liệu / Giải pháp tài chính */}
          <section className="w-full rounded-2xl bg-white px-4 py-4 shadow-sm">
            <h2 className="mb-3 text-[13px] font-semibold text-[#20273A]">
              Giải pháp tài chính online
            </h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <p className="text-[18px] font-semibold text-[#20273A]">+20</p>
                <p className="text-[10px] leading-snug text-[#5A6478]">
                  Nhãn hàng uy tín đã đồng hành trong lĩnh vực tài chính
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[18px] font-semibold text-[#20273A]">2015</p>
                <p className="text-[10px] leading-snug text-[#5A6478]">
                  Năm bắt đầu triển khai dịch vụ vay tiền online
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[18px] font-semibold text-[#20273A]">+3k</p>
                <p className="text-[10px] leading-snug text-[#5A6478]">
                  Khách hàng được hỗ trợ tài chính mỗi ngày
                </p>
              </div>
            </div>
          </section>

          {/* 4 bước vay */}
          <section className="w-[calc(100%+32px)] -mx-4 rounded-none bg-[#FFF5C5] px-4 py-6 space-y-4">
            <h2 className="text-[13px] font-semibold text-[#20273A]">
              4 Bước đơn giản để vay tiền mặt nhanh online
            </h2>
            <div className="flex space-x-2 text-[11px] font-semibold">
              <span className="rounded-full bg-[#F2B600] px-3 py-[4px] text-white">
                01
              </span>
              <span className="rounded-full bg-white px-3 py-[4px] text-[#A0A6B5]">
                02
              </span>
              <span className="rounded-full bg-white px-3 py-[4px] text-[#A0A6B5]">
                03
              </span>
              <span className="rounded-full bg-white px-3 py-[4px] text-[#A0A6B5]">
                04
              </span>
            </div>
            <div className="flex w-full flex-col items-center space-y-3 rounded-[32px] bg-white px-4 py-5">
              <div className="flex h-32 w-full items-center justify-center rounded-2xl bg-[#F7C948]">
                <div className="h-20 w-28 rounded-xl bg-[#FFE47A]" />
              </div>
              <p className="text-center text-[11px] leading-relaxed text-[#5A6478]">
                Chỉ cần CMND là hoàn tất hồ sơ trong 5 phút
              </p>
            </div>
          </section>

          {/* Điều kiện & mô tả khoản vay */}
          <section className="w-full space-y-4">
            <div className="w-full rounded-2xl bg-white px-4 py-4 shadow-sm">
              <h2 className="mb-2 text-[13px] font-semibold text-[#20273A]">
                Khoản vay trả góp linh hoạt tại CayVang
              </h2>
              <p className="text-[11px] leading-relaxed text-[#5A6478]">
                Lãi suất từ 18% - 24%/năm tuỳ hồ sơ. Kỳ hạn vay linh hoạt từ 91
                đến 180 ngày, hạn mức từ 2.000.000đ đến 10.000.000đ. Giải ngân
                nhanh qua tài khoản ngân hàng, thủ tục online 100%, không cần
                thế chấp tài sản.
              </p>
            </div>

            <div className="flex w-full justify-center">
              <div className="flex w-full max-w-[340px] justify-center rounded-[32px] bg-[#FFC94B] px-5 py-6">
                <div className="flex w-full flex-col items-center space-y-3 rounded-3xl bg-white px-4 py-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFE79A]">
                    <span className="text-lg">👤</span>
                  </div>
                  <p className="text-center text-[11px] leading-relaxed text-[#5A6478]">
                    Để nhận được khoản vay nhanh, hãy đảm bảo bạn đáp ứng đủ các
                    điều kiện: công dân Việt Nam từ 18–60 tuổi, có công việc và
                    thu nhập ổn định, sở hữu tài khoản ngân hàng chính chủ và
                    cung cấp thông tin chính xác.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Nội dung giới thiệu */}
          <section className="w-full space-y-3">
            <h2 className="text-[15px] font-semibold text-[#20273A]">
              Vay tiền nhanh online chỉ cần CMND
            </h2>
            <p className="text-[11px] leading-relaxed text-[#5A6478]">
              Trong thời đại công nghệ 4.0, vay tiền online trở nên phổ biến nhờ
              sự tiện lợi và nhanh chóng. Bạn không cần di chuyển hay chuẩn bị
              nhiều giấy tờ phức tạp, chỉ với CMND và tài khoản ngân hàng là đã
              có thể đăng ký khoản vay phù hợp nhu cầu chi tiêu, mua sắm hoặc
              giải quyết các vấn đề tài chính ngắn hạn.
            </p>
            <h3 className="text-[13px] font-semibold text-[#20273A]">
              Sự phát triển của dịch vụ vay tiền online
            </h3>
            <p className="text-[11px] leading-relaxed text-[#5A6478]">
              Các nền tảng vay trực tuyến như CayVang giúp khách hàng tiếp cận
              nguồn vốn nhỏ trong thời gian ngắn, minh bạch về chi phí và điều
              kiện. Quy trình thẩm định tự động giúp xét duyệt nhanh chóng,
              đồng thời vẫn đảm bảo an toàn thông tin cá nhân và tuân thủ quy
              định pháp luật.
            </p>
            <button className="mt-1 inline-flex rounded-full border border-[#D4D7E5] bg-white px-4 py-2 text-[11px] font-semibold text-[#20273A]">
              Đọc thêm
            </button>
          </section>

          {/* Footer */}
          <footer className="w-full space-y-3 pt-4 pb-10 text-center text-[11px] text-[#5A6478]">
            <div className="flex flex-col items-center space-y-1">
              <span className="text-[14px] font-semibold text-[#20273A]">
                1900 636059
              </span>
              <span className="max-w-[280px] text-[10px] leading-relaxed text-[#8C93A8]">
                Gọi ngay nếu bạn cần hỗ trợ hoặc có bất kỳ thắc mắc nào về khoản
                vay tại CayVang.
              </span>
            </div>
            <p className="px-4 text-[10px] leading-relaxed text-[#8C93A8]">
              Công ty TNHH Dịch Vụ Tài Chính CayVang. Địa chỉ: Tầng 6, Tòa nhà
              ABC, Quận 1, TP. Hồ Chí Minh.
            </p>
            <p className="text-[10px] text-[#B3B8C8]">
              © 2025 Bản quyền thuộc về CayVang.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
