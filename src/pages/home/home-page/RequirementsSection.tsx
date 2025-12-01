export default function RequirementsSection() {
  return (
    <section className="w-full mt-6 flex justify-center">
      <div
        className="w-full max-w-[320px] h-[460px] bg-no-repeat bg-contain bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/bg_section.png')" }}
      >
        <div className="flex w-[80%] flex-col items-center space-y-4 text-center mb-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF5C5]">
            <span className="text-2xl text-[#5A6478]">👤</span>
          </div>
          <p className="text-[15px] font-semibold leading-relaxed text-[#20273A]">
            Để nhận được khoản vay nhanh nhất, hãy đảm bảo bạn đáp ứng đủ các
            điều kiện như sau:
          </p>
          <div className="w-full space-y-1 text-left text-[13px] leading-relaxed text-[#5A6478]">
            <p>
              <span className="font-semibold">Tuổi:</span> 18+
            </p>
            <p>
              <span className="font-semibold">Tỉnh thành:</span> Toàn quốc
            </p>
            <p>
              <span className="font-semibold">Nghề nghiệp:</span> Người có thu
              nhập ổn định
            </p>
            <p>
              Và chỉ cần <span className="font-semibold">CMND bản gốc</span>.
            </p>
            <p>
              Có thể yêu cầu bổ sung chứng minh thu nhập nếu hồ sơ vay tín
              chấp thiếu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

