export default function PaymentInstructions() {
  return (
    <div className="w-full px-4 py-3 text-sm text-text-color">
      <h2 className="mb-3 text-base font-semibold">Hướng dẫn thanh toán</h2>

      <div className="rounded-xl bg-theme-sand-light-ultra px-4 py-3 text-[13px] leading-relaxed shadow-sm">

        <div className="mb-3 flex gap-3">
          <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-warning text-xs font-bold text-white">
            !
          </div>
          <p className="m-0">
            <span className="font-semibold">CẢNH BÁO</span>
            <br />
            <span>CHỈ THANH TOÁN vào tài khoản Bảo hiểm Bảo Minh.</span>
          </p>
        </div>

        <div className="flex gap-3">
          <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-warning text-xs font-bold text-white">
            !
          </div>
          <div className="space-y-1">
            <p className="m-0 font-semibold">
              KHÔNG THANH TOÁN KHOẢN VAY vào bất kỳ tài khoản cá nhân nào.
            </p>
            <p className="m-0">
              Quét mã QR hỗ trợ nhanh thông tin, hạn chế sai sót trong quá trình
              chuyển khoản. Vui lòng kiểm tra số tài khoản và nhập đúng số tài
              khoản trước khi hoàn tất thanh toán. Trường hợp thanh toán nhầm tài
              khoản: Mọi chi phí phát sinh trong thời gian chờ cập nhật điều
              chỉnh bạn phải tự chi trả.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
