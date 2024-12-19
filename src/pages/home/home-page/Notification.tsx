import { BellFilled } from "@ant-design/icons";

export default function Notification() {
  return (
    <div className="flex justify-center items-center w-screen md:w-[400px]">
      <div className="p-3 bg-white shadow-md flex flex-row justify-start items-start w-[93vw] rounded-xl space-x-3">
        <BellFilled className="text-[#818488]" />
        <p className="text-sm text-[#818488] font-normal tracking-wide">
          Tất cả các sản phẩm cho vay trong ứng dụng này là độc lập, được điều
          hành bởi các công ty riêng biệt, không ảnh hưởng đến nhau, trả nợ một
          sẽ không giúp các hộ gia đình khác san lần
        </p>
      </div>
    </div>
  );
}
