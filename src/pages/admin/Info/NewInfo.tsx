import * as React from "react";
import InfoComponentCommon from "./InfoComponentCommon";
import GeneralLoading from "../../../components/GeneralLoading";
import { useNavigate } from "react-router-dom";
import axiosRequest from "../../../plugins/request";
import { notification } from "antd";

export default function NewInfo() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await axiosRequest.post("/v1/information", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notification.success({
        message: "Thêm thông tin thành công",
      });
      navigate(-1);
    } catch (error) {
      notification.error({
        message: "Thêm thông tin thất bại",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InfoComponentCommon handleSubmit={handleSubmit} />
      <GeneralLoading isLoading={loading} />
    </>
  );
}
