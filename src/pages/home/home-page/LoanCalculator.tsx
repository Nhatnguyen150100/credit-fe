import { Slider } from "antd";
import { formatCurrency } from "../../../utils/format-money";

interface LoanCalculatorProps {
  loanAmount: number;
  onLoanAmountChange: (value: number) => void;
  minAmount?: number;
  maxAmount?: number;
}

export default function LoanCalculator({
  loanAmount,
  onLoanAmountChange,
  minAmount = 500000,
  maxAmount = 10000000,
}: LoanCalculatorProps) {
  return (
    <section className="rounded-[12px] bg-[#f0f7fb] p-6 mt-[43px]">
      {loanAmount > 4000000 && (
        <span className="text-xs text-error">
          Cần khoản vay lớn hơn? Tăng hạn mức ở lần vay tiếp theo và khi thanh
          toán đúng thời hạn.
        </span>
      )}
      <div className="mt-[5px] mb-[10px] flex flex-row justify-between items-center">
        <span className="leading-5 text-xs text-secondary-link font-[300]">
          Khoản vay
        </span>
        <span className="font-[17.5px] text-theme-dark">
          {formatCurrency(loanAmount)}
        </span>
      </div>
      <Slider
        value={loanAmount}
        min={minAmount}
        max={maxAmount}
        step={500000}
        onChange={(value) => onLoanAmountChange(value as number)}
        tooltip={{ open: false }}
        styles={{
          rail: {
            background: "#FFE9B0",
            height: "10px",
            borderRadius: "9999px",
          },
          track: {
            background: `${
              loanAmount > 4000000 ? "var(--error)" : "#fc924f"
            }`,
            height: "10px",
            borderRadius: "9999px",
          },
          handle: {
            width: "26px",
            height: "26px",
            background: `${
              loanAmount > 4000000 ? "var(--error)" : "#F2B600"
            }`,
            border: "4px solid white",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
            marginTop: "-5px",
          },
        }}
        className="custom-slider"
      />
      <div className="flex justify-between text-[10px] text-gray-400">
        <span>{formatCurrency(minAmount)}</span>
        <span>{formatCurrency(maxAmount)}</span>
      </div>
      <div className="flex flex-row justify-between items-center mt-[10px]">
        <span className="leading-5 text-sm text-secondary-link font-[300]">
          Tổng thanh toán
        </span>
        <span className="font-[17.5px] text-theme-dark">
          {formatCurrency(loanAmount)}
        </span>
      </div>
    </section>
  );
}

