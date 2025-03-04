import React, { useEffect, useState } from "react";
import GeneralLoading from "../../../components/GeneralLoading";
import { useNavigate, useParams } from "react-router-dom";
import InfoComponentCommon from "./InfoComponentCommon";
import axiosRequest from "../../../plugins/request";
import { Breadcrumb, notification, Spin } from "antd";
import { IInfo } from "../../../types/info";
import Visibility from "../../../components/visibility";

export default function EditInfo() {
  const { id } = useParams<{ id: string }>();
  const [userInfo, setUserInfo] = useState<IInfo>();

  const handleGetInfo = async () => {
    try {
      setLoading(true);
      const rs = await axiosRequest.get(`/v1/information/${id}`);
      const data = rs.data.data;
      setUserInfo(data);
    } catch (error: any) {
      console.log("🚀 ~ handleGetInfo ~ error:", error.message);
      notification.error({
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) handleGetInfo();
  }, [id]);

  const handleSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await axiosRequest.put(`/v1/information/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      notification.success({
        message: "Cập nhật thông tin thành công",
      });
      navigate(-1);
    } catch (error: any) {
      notification.error({
        message: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Breadcrumb
        className="mb-10"
        items={[
          {
            title: (
              <a className="text-lg" onClick={() => navigate(-1)}>
                Danh sách thông tin
              </a>
            ),
          },
          {
            title: (
              <a href="#" className="text-lg">
                {userInfo?.name ?? "unknown"}
              </a>
            ),
          },
        ]}
      />
      <Visibility visibility={Boolean(userInfo)} suspenseComponent={<Spin />}>
        <InfoComponentCommon infoProps={userInfo} handleSubmit={handleSubmit} />
      </Visibility>
      <GeneralLoading isLoading={loading} />
    </>
  );
}
