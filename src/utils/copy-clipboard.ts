import Clipboard from "clipboard";
import { message } from "antd";

const copyToClipboard = (
  textToCopy: string,
  messageSuccess = "Nội dung đã được sao chép"
) => {
  const button = document.createElement("button");
  document.body.appendChild(button);

  const clipboard = new Clipboard(button, {
    text: () => textToCopy,
  });

  clipboard.on("success", () => {
    message.success(messageSuccess);
    clipboard.destroy();
  });

  clipboard.on("error", () => {
    message.error("Không thể sao chép nội dung");
    clipboard.destroy();
  });

  button.click();
};

export { copyToClipboard };
