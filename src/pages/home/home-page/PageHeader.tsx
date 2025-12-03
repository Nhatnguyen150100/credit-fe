import { APP_NAME } from "../../../constants/global";

export default function PageHeader() {
  return (
    <section className="w-full">
      <h1 className="text-[29.5px] font-normal leading-[43.0161px] text-graphite text-center mt-[20px] mb-[-20px]">
        Vay Nhanh &amp; Dễ Dàng
        <br />
        Hơn Với {APP_NAME}
      </h1>
    </section>
  );
}

