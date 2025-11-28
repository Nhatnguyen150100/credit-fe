import { PhoneOutlined } from "@ant-design/icons";
import { Slider } from "antd";
import { useState } from "react";
import { formatCurrency } from "../../../utils/format-money";

export default function LandingPage() {
  const [loanAmount, setLoanAmount] = useState(1500000);
  const [showScamDetails, setShowScamDetails] = useState(false);
  const [showFullIntro, setShowFullIntro] = useState(false);
  const minAmount = 500000;
  const maxAmount = 10000000;

  return (
    <main className="flex w-full flex-col p-[10px]">
      <section className="w-full">
        <h1 className="text-[29.5px] font-normal leading-[43.0161px] text-graphite text-center mt-[20px] mb-[-20px]">
          Vay Nhanh &amp; Dễ Dàng
          <br />
          Hơn Với CayVang
        </h1>
      </section>

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
          onChange={(value) => setLoanAmount(value as number)}
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

      <section className="w-full rounded-2xl mt-5 flex flex-col space-y-4">
        <div className="flex w-full items-center justify-between rounded-2xl bg-[#f0f7fb] px-4 py-2.5 shadow-sm">
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
          Vui lòng sử dụng số điện thoại chính chủ, trùng với số điện thoại đăng
          ký tài khoản ngân hàng để quy trình xét duyệt diễn ra nhanh chóng và
          chính xác.
        </p>

        <button className="w-full rounded-full bg-primary-color-dark text-white py-2">
          Đăng nhập ngay
        </button>
      </section>

      <button className="fixed bottom-20 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#247CFF] text-lg text-white shadow-lg">
        ?
      </button>

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

      <section className="w-full rounded-2xl bg-white px-5 py-6 shadow-sm mt-6">
        <h2 className="mb-6 text-2xl font-normal text-[#20273A] text-center">
          Giải pháp tài chính online
        </h2>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-[48px] leading-none font-[300] text-[#20273A]">
              +20
            </p>
            <p className="text-left text-[13px] leading-relaxed text-[#5A6478] max-w-[200px] font-[300]">
              Năm kinh nghiệm toàn cầu trong lĩnh vực tài chính
            </p>
          </div>

          <div className="flex items-start justify-between">
            <p className="mr-6 text-left text-[13px] leading-relaxed text-[#5A6478] max-w-[200px] font-[300]">
              Năm đầu tiên hoạt động trên thị trường. Giải pháp vay trực tuyến
              đầu tiên tại Việt Nam
            </p>
            <p className="text-[48px] leading-none font-[300] text-[#20273A]">
              2015
            </p>
          </div>

          <div className="flex items-start justify-between">
            <p className="text-[48px] leading-none font-[300] text-[#20273A]">
              +3k
            </p>
            <p className="ml-6 text-left text-[13px] leading-relaxed text-[#5A6478] max-w-[200px] font-[300]">
              Khách hàng được tư vấn tài chính thành công mỗi ngày
            </p>
          </div>
        </div>
      </section>

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

      <section className="w-full mt-6 space-y-4">
        <h2 className="text-center text-[18px] font-normal text-[#20273A]">
          Khoản vay trả góp linh hoạt tại
          <br />
          CayVang
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

      <section className="w-full space-y-4 mt-6">
        <h2 className="text-[28px] leading-tight font-normal text-[#20273A]">
          Vay tiền nhanh
          <br />
          online chỉ cần
          <br />
          CMND
        </h2>

        {showFullIntro ? (
          <div className="space-y-4">
            <h3 className="text-[15px] font-semibold text-[#20273A]">
              Sự phát triển của dịch vụ vay tiền online
            </h3>

            <p className="text-[13px] leading-relaxed text-[#5A6478]">
              Trong thời đại công nghệ 4.0 hiện nay, vay tiền online đang trở
              thành một trong những giải pháp tài chính tối ưu cho những ai cần
              tiền gấp. Cuộc sống ngày càng bận rộn, áp lực tài chính gia tăng,
              khiến nhu cầu vay tiền nhanh chóng và thuận tiện trở nên cần thiết
              hơn bao giờ hết.
            </p>

            <p className="text-[13px] leading-relaxed text-[#5A6478]">
              Khi gặp khó khăn tài chính, không phải lúc nào cũng dễ dàng xin
              tiền từ bạn bè hoặc gia đình. Trong khi đó, việc đến ngân hàng
              thường liên quan đến nhiều thủ tục rườm rà và thời gian chờ đợi
              lâu. Chính vì vậy, vay tiền online đã trở thành giải pháp hoàn
              hảo, giúp giải quyết các vấn đề tài chính nhanh chóng và hiệu quả.
            </p>

            <h3 className="pt-2 text-[15px] font-semibold text-[#20273A]">
              Vay tiền online là gì?
            </h3>
            <p className="text-[13px] leading-relaxed text-[#5A6478]">
              Vay tiền online, hay vay nhanh online, là hình thức vay vốn mà
              toàn bộ quy trình từ đăng ký, xét duyệt đến giải ngân đều được
              thực hiện trực tuyến. Điều này có nghĩa là bạn có thể hoàn tất mọi
              thủ tục mà không cần phải đến tận nơi.
            </p>
            <p className="text-[13px] leading-relaxed text-[#5A6478]">
              Có hai hình thức chính để vay tiền online:
            </p>
            <ol className="ml-5 space-y-2 text-[13px] leading-relaxed text-[#5A6478] list-decimal">
              <li>
                <span className="font-semibold">Vay qua ứng dụng:</span> Bạn chỉ
                cần tải ứng dụng vay tiền từ CH Play hoặc App Store, sau đó thực
                hiện các bước đăng ký đơn giản. Các ứng dụng này thường có giao
                diện thân thiện và hướng dẫn rõ ràng, giúp người dùng dễ dàng
                hoàn thành quy trình vay.
              </li>
              <li>
                <span className="font-semibold">Vay trên website:</span> Đăng ký
                khoản vay trực tuyến ngay trên trang web của các công ty cho
                vay. Tại đây, bạn sẽ tìm thấy nhiều thông tin chi tiết về các
                gói vay khác nhau, lãi suất và điều kiện vay, giúp so sánh và
                lựa chọn gói vay phù hợp.
              </li>
            </ol>

            <p className="pt-2 text-[13px] leading-relaxed text-[#5A6478]">
              Đặc điểm nổi bật của vay tiền online là thủ tục đơn giản, chỉ yêu
              cầu CMND/CCCD và tài khoản ngân hàng. Hạn mức vay linh hoạt, thời
              gian giải ngân nhanh chóng, và tiền sẽ được chuyển trực tiếp vào
              tài khoản ngân hàng của bạn.
            </p>

            <h3 className="pt-2 text-[15px] font-semibold text-[#20273A]">
              Khi nào nên vay tiền online?
            </h3>
            <p className="text-[13px] leading-relaxed text-[#5A6478]">
              Vay tiền online phù hợp trong nhiều tình huống khác nhau như:
            </p>
            <ul className="ml-5 space-y-1 text-[13px] leading-relaxed text-[#5A6478] list-disc">
              <li>
                Khi bạn cần tiền gấp để trang trải chi phí sinh hoạt vào cuối
                tháng.
              </li>
              <li>
                Là sinh viên cần tiền đóng học phí hoặc mua sắm dụng cụ học tập.
              </li>
              <li>Khi bạn gặp sự cố sức khỏe bất ngờ và cần tiền thuốc men.</li>
              <li>Hoặc bạn cần tiền cho các dịp lễ, cưới hỏi, liên hoan…</li>
            </ul>

            <h3 className="pt-2 text-[15px] font-semibold text-[#20273A]">
              Ai có thể sử dụng dịch vụ vay tiền online?
            </h3>
            <p className="text-[13px] leading-relaxed text-[#5A6478]">
              Vay tiền online hỗ trợ tất cả công dân Việt Nam, từ nhân viên văn
              phòng, công nhân, cho đến sinh viên. Chỉ cần bạn có CMND/CCCD và
              tài khoản ngân hàng chính chủ là có thể dễ dàng tiếp cận khoản
              vay.
            </p>

            <h3 className="pt-2 text-[15px] font-semibold text-[#20273A]">
              Tại sao vay tiền online trở nên phổ biến?
            </h3>
            <p className="text-[13px] leading-relaxed text-[#5A6478]">
              Trong những năm qua, dịch vụ vay tiền online đã thu hút sự chú ý
              của người tiêu dùng với các ưu điểm nổi bật:
            </p>
            <ul className="ml-5 space-y-1 text-[13px] leading-relaxed text-[#5A6478] list-disc">
              <li>
                <span className="font-semibold">Dịch vụ 24/7:</span> Đăng ký vay
                bất cứ lúc nào, kể cả ngoài giờ hành chính.
              </li>
              <li>
                <span className="font-semibold">Thủ tục đơn giản:</span> Chỉ cần
                CMND/CCCD và tài khoản ngân hàng, không cần chứng minh thu nhập
                hay thế chấp tài sản.
              </li>
              <li>
                <span className="font-semibold">Hạn mức linh hoạt:</span> Có thể
                lựa chọn khoản vay theo nhu cầu tài chính thực tế.
              </li>
              <li>
                <span className="font-semibold">Giải ngân nhanh chóng:</span>{" "}
                Tiền được chuyển vào tài khoản chỉ trong thời gian ngắn sau khi
                được phê duyệt.
              </li>
            </ul>

            <h3 className="pt-2 text-[15px] font-semibold text-[#20273A]">
              Quy trình đăng ký vay tiền online:
            </h3>
            <ol className="ml-5 space-y-1 text-[13px] leading-relaxed text-[#5A6478] list-decimal">
              <li>Truy cập website hoặc ứng dụng của đơn vị cho vay.</li>
              <li>Điền thông tin cá nhân và chọn số tiền cần vay.</li>
              <li>
                Chờ xét duyệt hồ sơ và nhận thông báo qua điện thoại/email.
              </li>
              <li>Nhận tiền về tài khoản ngân hàng sau khi được phê duyệt.</li>
            </ol>

            <h3 className="pt-2 text-[15px] font-semibold text-[#20273A]">
              Kết luận
            </h3>
            <p className="text-[13px] leading-relaxed text-[#5A6478]">
              Dịch vụ vay tiền online không chỉ giúp giải quyết khó khăn tài
              chính nhanh chóng mà còn mang lại sự thuận tiện và an toàn. Nếu
              bạn cần tiền gấp, hãy tìm hiểu kỹ thông tin và lựa chọn đơn vị cho
              vay uy tín để đảm bảo quyền lợi của mình.
            </p>

            <button
              className="mt-2 inline-flex rounded-[16px] bg-[#E5E7EB] px-6 py-3 text-[13px] font-semibold text-[#374151]"
              onClick={() => setShowFullIntro(false)}
            >
              Thu gọn
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-[15px] font-semibold text-[#20273A]">
              Sự phát triển của dịch vụ vay tiền online
            </h3>

            <p className="text-[13px] leading-relaxed text-[#5A6478]">
              Trong thời đại công nghệ 4.0 hiện nay, vay tiền online đang trở
              thành một trong những giải pháp tài chính tối ưu cho những ai cần
              tiền gấp. Cuộc sống ngày càng bận rộn, áp lực tài chính gia tăng,
              khiến nhu cầu vay tiền nhanh chóng và thuận tiện trở nên cần thiết
              hơn bao giờ hết.
            </p>

            <button
              className="mt-2 inline-flex rounded-[16px] bg-[#F2B600] px-6 py-3 text-[13px] font-semibold text-white shadow-sm"
              onClick={() => setShowFullIntro(true)}
            >
              Đọc thêm
            </button>
          </>
        )}
      </section>
    </main>
  );
}
