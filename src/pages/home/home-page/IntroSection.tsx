import { useState } from "react";

export default function IntroSection() {
  const [showFullIntro, setShowFullIntro] = useState(false);

  return (
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
  );
}

