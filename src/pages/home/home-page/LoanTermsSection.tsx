import { APP_NAME } from "../../../constants/global";

export default function LoanTermsSection() {
  return (
    <section className="w-full mt-6 space-y-4">
      <h2 className="text-center text-[18px] font-normal text-[#20273A]">
        Khoản vay trả góp linh hoạt tại
        <br />
        {APP_NAME}
      </h2>

      <div className="space-y-1">
        <h3 className="text-xl font-normal text-[#20273A]">Lãi Suất</h3>
        <p className="text-[13px] leading-relaxed text-[#5A6478] font-[300]">
          Lãi suất tối thiểu{" "}
          <span className="font-[300]">12% — Lãi suất tối đa 20%/năm</span>
          **
        </p>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-normal text-[#20273A]">Kỳ Hạn Vay</h3>
        <p className="text-[13px] leading-relaxed text-[#5A6478] font-[300]">
          Thời hạn khoản vay tối đa là{" "}
          <span className="font-[300]">12 tháng</span>, thời hạn tối thiểu là{" "}
          <span className="font-[300]">90 ngày</span>.
        </p>
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-normal text-[#20273A]">Hạn Mức Vay</h3>
        <p className="text-[13px] leading-relaxed text-[#5A6478]">
          <span className="font-[300]">VND 500 000</span> đến{" "}
          <span className="font-[300]">VND 10 000 000</span>.
        </p>
      </div>

      <div className="pt-2 space-y-2">
        <p className="text-[12px] leading-relaxed text-[#8C93A8] font-[300]">
          <span className="font-semibold">** Ví dụ khoản vay đầu:</span> Vay{" "}
          <span className="font-semibold">1.000.000 VND</span> và trả toàn bộ
          sau 180 ngày sử dụng khoản vay. Lãi + Phí xử lý hồ sơ là khoảng{" "}
          <span className="font-semibold">10%</span>. Tổng số tiền phải trả là
          khoảng <span className="font-semibold">1.100.000 VND</span>.
        </p>
        <p className="text-[12px] leading-relaxed text-[#8C93A8]">
          <span className="font-semibold">** Ví dụ cho khoản vay lại:</span>{" "}
          Vay <span className="font-semibold">2.000.000 VND</span> và trả toàn
          bộ sau 180 ngày sử dụng khoản vay. Lãi + Phí dịch vụ là khoảng{" "}
          <span className="font-semibold">33.333 VND/tháng</span>. Tổng số
          tiền phải trả là ={" "}
          <span className="font-semibold">2.200.000 VND</span>.
        </p>
      </div>
    </section>
  );
}

