import { APP_NAME } from "../../../../constants/global";

export default function Term() {
  return (
    <div className="flex flex-col w-full items-start justify-center bg-gray-100 px-4 py-6">
      <div className="mb-4 border-b border-gray-100 pb-3">
        <h1 className="text-xl font-semibold text-text-color">
          Chính sách Bảo mật
        </h1>
        <p className="mt-1 text-xs text-secondary-link">
          Vui lòng đọc kỹ trước khi tiếp tục sử dụng ứng dụng.
        </p>
      </div>

      <div className="space-y-3 pr-1 text-sm leading-relaxed text-text-color">
        <ol className="list-decimal space-y-4 pl-4">
          <li>
            <strong>
              Chấp thuận của Bạn đối với Chính sách Quyền riêng tư này
            </strong>
            <ol className="list-decimal space-y-2 pl-4">
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
            <ol className="list-decimal space-y-2 pl-4">
              <li>
                <strong>Quy định thu thập thông tin:</strong> Chính sách này quy
                định cách mà {APP_NAME} thu thập, sử dụng, bảo vệ và chia sẻ
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
            <ol className="list-decimal space-y-2 pl-4">
              <li>
                <strong>Thông tin Bạn cung cấp:</strong>
                <ol className="list-decimal space-y-2 pl-4">
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
                <ol className="list-decimal space-y-2 pl-4">
                  <li>
                    <strong>Thông tin sử dụng:</strong> Chúng tôi tự động thu
                    thập thông tin về cách Bạn truy cập Ứng dụng.
                  </li>
                  <li>
                    <strong>Thông tin thiết bị:</strong> Thông tin về thiết bị
                    Bạn sử dụng để truy cập Ứng dụng {APP_NAME}
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
            <ol className="list-decimal space-y-2 pl-4">
              <li>
                <strong>Mục đích sử dụng:</strong> Chúng tôi sử dụng thông tin
                để vận hành Ứng dụng và cải thiện dịch vụ.
              </li>
              <li>
                <strong>Ví dụ về sử dụng:</strong>
                <ol className="list-decimal space-y-2 pl-4">
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
