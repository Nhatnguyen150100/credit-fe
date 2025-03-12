import React, { useState } from "react";
import { IFirebaseConfig } from "../../../types/firebase";
import axiosRequest from "../../../plugins/request";
import { message, Radio, Card, Spin, Descriptions } from "antd";

export default function FirebaseSetting() {
  const [loading, setLoading] = useState<boolean>(false);
  const [firebaseConfig, setFirebaseConfig] = React.useState<IFirebaseConfig>();

  const handleGetFirebaseConfig = async () => {
    try {
      setLoading(true);
      const rs: any = await axiosRequest.get("/v1/firebase");
      setFirebaseConfig(rs.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleGetFirebaseConfig();
  }, []);

  const handleUpdateFirebaseConfig = async (
    firebaseConfigSelected: "BACKUP_APP_CONFIG" | "MAIN_APP_CONFIG"
  ) => {
    try {
      setLoading(true);
      const rs: any = await axiosRequest.post(`/v1/firebase`, {
        firebaseConfigSelected,
        id: firebaseConfig?._id,
      });
      await handleGetFirebaseConfig();
      message.success(rs.data.message);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Cấu hình Firebase" loading={loading} className="shadow-lg">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Chọn cấu hình:</h3>
        <Spin spinning={loading}>
          <Radio.Group
            value={firebaseConfig?.firebaseConfigSelected}
            onChange={(e) => handleUpdateFirebaseConfig(e.target.value)}
            buttonStyle="solid"
          >
            <Radio.Button value="MAIN_APP_CONFIG" className="w-40 text-center">
              Cấu hình chính
            </Radio.Button>
            <Radio.Button
              value="BACKUP_APP_CONFIG"
              className="w-40 text-center ml-4"
            >
              Cấu hình dự phòng
            </Radio.Button>
          </Radio.Group>
        </Spin>
      </div>

      {firebaseConfig && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">
            Thông tin cấu hình hiện tại:
          </h3>
          <Descriptions
            bordered
            column={1}
            className="rounded-lg overflow-hidden"
          >
            <Descriptions.Item label="Loại cấu hình" className="bg-gray-50">
              <span className="font-medium">
                {firebaseConfig.firebaseConfigSelected === "MAIN_APP_CONFIG"
                  ? "Thông tin cấu hình chính"
                  : "Thông tin cấu hình dự phòng"}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="API Key">
              {firebaseConfig.apiKey}
            </Descriptions.Item>
            <Descriptions.Item label="Auth Domain">
              {firebaseConfig.authDomain}
            </Descriptions.Item>
            <Descriptions.Item label="Project ID">
              {firebaseConfig.projectId}
            </Descriptions.Item>
            <Descriptions.Item label="Storage Bucket">
              {firebaseConfig.storageBucket}
            </Descriptions.Item>
            <Descriptions.Item label="Messaging Sender ID">
              {firebaseConfig.messagingSenderId}
            </Descriptions.Item>
            <Descriptions.Item label="App ID">
              {firebaseConfig.appId}
            </Descriptions.Item>
            <Descriptions.Item label="Measurement ID">
              {firebaseConfig.measurementId}
            </Descriptions.Item>
            <Descriptions.Item label="Cập nhật lúc">
              {new Date(firebaseConfig.updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </Card>
  );
}
