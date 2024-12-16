import { ArrowLeftOutlined, BugOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Term() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-start items-center bg-gray-100 sm:max-w-[450px] sm:border">
      <div className="shadow sticky top-0 z-10 py-3 px-4 flex justify-between items-center w-full primary-bg border-b border-white">
        <ArrowLeftOutlined
          className="text-white"
          onClick={() => navigate(-1)}
        />
        <span className="text-sm text-white font-light">
          Chính sách bảo mật
        </span>
        <BugOutlined className="text-white" />
      </div>
      <div className="flex flex-col justify-start items-start space-y-3 mt-5 w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Chính sách Bảo mật</h1>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>
              Chấp thuận của Bạn đối với Chính sách Quyền riêng tư này
            </strong>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Đồng ý với Chính sách:</strong> Khi Bạn sử dụng, truy
                cập hoặc tương tác với Ứng dụng của chúng tôi, Bạn đồng ý với
                Chính sách Quyền riêng tư của chúng tôi.
              </li>
              <li>
                <strong>Cơ sở pháp lý:</strong> Chấp thuận của Bạn chính là cơ
                sở pháp lý để chúng tôi thu thập, sử dụng, lưu trữ và xử lý
                Thông tin cá nhân của Bạn.
              </li>
              <li>
                <strong>Sử dụng dịch vụ bên thứ ba:</strong> Bạn thừa nhận rằng
                khi đồng ý với Chính sách này, Bạn đang sử dụng Ứng dụng tích
                hợp với các dịch vụ bên thứ ba.
              </li>
            </ol>
          </li>
          <li>
            <strong>Phạm vi áp dụng của Chính sách Quyền riêng tư này</strong>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Quy định thu thập thông tin:</strong> Chính sách này quy
                định cách mà Yoshi Credit thu thập, sử dụng, bảo vệ và chia sẻ
                thông tin.
              </li>
              <li>
                <strong>Không áp dụng cho bên thứ ba:</strong> Chính sách này
                không áp dụng cho thông tin thu thập từ ứng dụng bên thứ ba.
              </li>
            </ol>
          </li>
          <li>
            <strong>Thông tin mà chúng tôi thu thập</strong>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Thông tin Bạn cung cấp:</strong>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Các phương thức cung cấp:</strong> Bạn đồng ý cung
                    cấp thông tin qua các biểu mẫu và tính năng trên Ứng dụng.
                  </li>
                  <li>
                    <strong>Thông tin cá nhân:</strong> Thông tin có thể nhận
                    dạng Bạn như tên, địa chỉ, email.
                  </li>
                  <li>
                    <strong>Thông tin phi cá nhân:</strong> Thông tin không xác
                    định Bạn cá nhân như giới tính.
                  </li>
                </ol>
              </li>
              <li>
                <strong>Thông tin tự động thu thập:</strong>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Thông tin sử dụng:</strong> Chúng tôi tự động thu
                    thập thông tin về cách Bạn truy cập Ứng dụng.
                  </li>
                  <li>
                    <strong>Thông tin thiết bị:</strong> Thông tin về thiết bị
                    Bạn sử dụng để truy cập Ứng dụng Yoshi Credit
                  </li>
                </ol>
              </li>
              <li>
                <strong>Thông tin từ bên thứ ba:</strong> Chúng tôi có thể thu
                thập thông tin từ các đối tác bên thứ ba.
              </li>
            </ol>
          </li>
          <li>
            <strong>Sử dụng thông tin mà chúng tôi thu thập</strong>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>Mục đích sử dụng:</strong> Chúng tôi sử dụng thông tin
                để vận hành Ứng dụng và cải thiện dịch vụ.
              </li>
              <li>
                <strong>Ví dụ về sử dụng:</strong>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Tạo Tài khoản:</strong> Để tạo và bảo mật Tài khoản
                    người dùng.
                  </li>
                  <li>
                    <strong>Cải thiện đề xuất:</strong> Điều chỉnh nội dung và
                    đề xuất phù hợp.
                  </li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
}
