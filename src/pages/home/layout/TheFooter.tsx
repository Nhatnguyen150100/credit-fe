import { PhoneOutlined } from "@ant-design/icons";

export default function TheFooter() {
  return (
    <footer className="w-full pt-8 pb-10 text-center text-[#5A6478]">
      <a
        href="tel:1900636059"
        className="mx-auto flex max-w-[320px] items-center justify-center space-x-3"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F5F7FB] text-[#20273A]">
          <PhoneOutlined />
        </div>
        <span className="text-[20px] font-semibold text-[#20273A]">
          1900 636059
        </span>
      </a>

      <p className="mt-3 px-8 text-[12px] leading-relaxed">
        Cước gọi 1000đ/phút. Xin hãy kiểm tra số dư trước khi gọi, hoặc sử
        dụng phương thức liên hệ khác.
      </p>

      <div className="mt-3 space-y-1 text-[12px]">
        <p>
          Thứ 2 - Thứ 6: <span className="font-semibold">07:30 - 18:00</span>
        </p>
        <p>
          Thứ 7 &amp; Chủ Nhật:{" "}
          <span className="font-semibold">08:00 - 17:00</span>
        </p>
      </div>

      <div className="mt-6 px-6 text-[12px] leading-relaxed">
        <p>
          64 Võ Thị Sáu, Phường Tân Định, Quận 1, Thành phố Hồ Chí Minh, Việt
          Nam. Giấy CN ĐKDN số 0317720328 do Sở Kế hoạch và Đầu tư TP.HCM cấp
          ngày 07/03/2023.
        </p>
      </div>

      <p className="mt-3 text-[12px]">© 2025 Bản quyền thuộc về CayVang.</p>
    </footer>
  );
}


