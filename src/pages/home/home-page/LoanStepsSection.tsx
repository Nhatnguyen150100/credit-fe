export default function LoanStepsSection() {
  return (
    <section className="w-[calc(100%+32px)] -mx-4 rounded-none bg-[#FFF5C5] px-4 py-8 space-y-6">
      <h2 className="text-center text-[18px] font-normal text-[#20273A]">
        4 Bước đơn giản để vay tiền mặt
        <br />
        nhanh online
      </h2>

      <div className="flex justify-center space-x-4 text-[16px] font-normal">
        <button className="h-14 w-16 rounded-2xl bg-[#F2B600] text-[#20273A] shadow-sm">
          01
        </button>
        <button className="h-14 w-16 rounded-2xl bg-white text-[#A0A6B5] shadow-sm">
          02
        </button>
        <button className="h-14 w-16 rounded-2xl bg-white text-[#A0A6B5] shadow-sm">
          03
        </button>
        <button className="h-14 w-16 rounded-2xl bg-white text-[#A0A6B5] shadow-sm">
          04
        </button>
      </div>

      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-[280px] rounded-[32px] bg-white px-4 pt-5 pb-6 shadow-sm">
          <div className="mx-auto flex h-[260px] w-full max-w-[240px] flex-col items-center justify-start rounded-[28px] bg-[#FFE47A] pt-4">
            <div className="flex w-full items-center justify-between px-4 text-[10px] text-[#5A6478]">
              <span>14:10</span>
              <span className="text-[11px]">● ● ●</span>
            </div>

            <div className="mt-6 flex w-full justify-center">
              <img
                src="/svg/cccd.svg"
                alt="Minh hoạ CCCD"
                className="h-[140px] w-auto"
              />
            </div>
          </div>
          <p className="mt-4 text-center text-[12px] leading-relaxed text-[#5A6478]">
            Chỉ cần CMND là hoàn tất thủ tục
            <br />
            trong 5 phút
          </p>
        </div>
      </div>
    </section>
  );
}

