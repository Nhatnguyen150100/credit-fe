import { useState, useRef } from "react";
import {
  Modal,
  Button,
  Upload,
  Progress,
  Alert,
  Table,
  Typography,
  message,
  Tag,
} from "antd";
import type { UploadFile } from "antd";
import {
  InboxOutlined,
  FileTextOutlined,
  WarningOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import axiosRequest from "../plugins/request";

interface ImportJobStatus {
  _id: string;
  fileName: string;
  status: "pending" | "processing" | "completed" | "failed";
  totalRows: number;
  processedRows: number;
  inserted: number;
  duplicates: { row: number; user_id: string; reason: string }[];
  errors: { row: number; user_id: string; reason: string }[];
  failReason?: string;
}

interface PreviewData {
  headers: string[];
  rows: Record<string, string>[];
  totalRows: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PREVIEW_PAGE_SIZE = 10;

enum ImportStep {
  Upload = "upload",
  Preview = "preview",
  Processing = "processing",
  Result = "result",
}

function parseCSVPreview(text: string): PreviewData {
  const lines = text.split(/\r?\n/).filter((l) => l.trim());
  if (lines.length === 0) return { headers: [], rows: [], totalRows: 0 };

  const parseRow = (line: string): string[] => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
      } else if (ch === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseRow(lines[0]);
  const dataLines = lines.slice(1);
  const rows = dataLines.map((line, i) => {
    const values = parseRow(line);
    const row: Record<string, string> = { _key: String(i) };
    headers.forEach((h, j) => {
      row[h] = values[j] ?? "";
    });
    return row;
  });

  return { headers, rows, totalRows: dataLines.length };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const statusTag = (status: ImportJobStatus["status"]) => {
  const map: Record<string, { color: string; text: string }> = {
    pending: { color: "default", text: "Chờ xử lý" },
    processing: { color: "processing", text: "Đang xử lý" },
    completed: { color: "success", text: "Hoàn tất" },
    failed: { color: "error", text: "Thất bại" },
  };
  const { color, text } = map[status] || { color: "default", text: status };
  return <Tag color={color}>{text}</Tag>;
};

export default function CsvImportModal({ open, onClose, onSuccess }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [preview, setPreview] = useState<PreviewData | null>(null);
  const [step, setStep] = useState<ImportStep>(ImportStep.Upload);
  const [uploading, setUploading] = useState(false);
  const [jobStatus, setJobStatus] = useState<ImportJobStatus | null>(null);
  const pollRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPollingRef = useRef(false);

  const stopPolling = () => {
    isPollingRef.current = false;
    if (pollRef.current) {
      clearTimeout(pollRef.current);
      pollRef.current = null;
    }
  };

  const pollJobStatus = (jobId: string) => {
    isPollingRef.current = true;

    const poll = async () => {
      if (!isPollingRef.current) return;
      try {
        const rs = await axiosRequest.get(`/v1/information/import-jobs/${jobId}`);
        const job: ImportJobStatus = rs.data.data;
        setJobStatus(job);
        if (job.status === "completed" || job.status === "failed") {
          isPollingRef.current = false;
          setStep(ImportStep.Result);
          if (job.status === "completed") onSuccess();
          return;
        }
      } catch {
      }
      if (isPollingRef.current) {
        pollRef.current = setTimeout(poll, 1000);
      }
    };

    poll();
  };

  const handleFileSelect = (f: File) => {
    setFile(f);
    setFileList([{ uid: "-1", name: f.name, status: "done", originFileObj: f as any }]);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setPreview(parseCSVPreview(text));
      setStep(ImportStep.Preview);
    };
    reader.readAsText(f, "utf-8");
  };

  const handleReset = () => {
    setFile(null);
    setFileList([]);
    setPreview(null);
    setStep(ImportStep.Upload);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      setUploading(true);
      setStep(ImportStep.Processing);
      const rs = await axiosRequest.post("/v1/information/import-csv", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      pollJobStatus(rs.data.data.jobId);
    } catch (error: any) {
      setStep(ImportStep.Preview);
      message.error(error.response?.data?.message || "Upload thất bại");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    stopPolling();
    setFile(null);
    setFileList([]);
    setPreview(null);
    setJobStatus(null);
    setStep(ImportStep.Upload);
    isPollingRef.current = false;
    onClose();
  };

  const previewColumns =
    preview?.headers.map((h) => ({
      title: <span className="text-xs font-semibold text-gray-600">{h}</span>,
      dataIndex: h,
      key: h,
      ellipsis: true,
      render: (v: string) => <span className="text-xs">{v}</span>,
    })) ?? [];

  const resultColumns = [
    { title: "Dòng", dataIndex: "row", key: "row", width: 60 },
    { title: "CCCD", dataIndex: "user_id", key: "user_id", width: 140 },
    { title: "Lý do", dataIndex: "reason", key: "reason" },
  ];

  const progressPercent =
    jobStatus && jobStatus.totalRows > 0
      ? Math.round((jobStatus.processedRows / jobStatus.totalRows) * 100)
      : 0;

  const modalWidth = step === ImportStep.Preview ? 960 : 640;

  return (
    <Modal
      title="Import dữ liệu từ CSV"
      open={open}
      onCancel={handleClose}
      footer={null}
      width={modalWidth}
      destroyOnClose
      styles={{ body: { padding: "16px 24px" } }}
    >
      {step === ImportStep.Upload && (
        <div>
          <Upload.Dragger
            accept=".csv"
            maxCount={1}
            fileList={fileList}
            showUploadList={false}
            beforeUpload={(f) => {
              handleFileSelect(f);
              return false;
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Kéo thả hoặc click để chọn file CSV</p>
            <p className="ant-upload-hint">Chỉ chấp nhận 1 file .csv, tối đa 100MB</p>
          </Upload.Dragger>

          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <Typography.Text type="secondary" className="text-xs leading-5">
              <strong>Cột bắt buộc:</strong> user_id, name, bank_name, phone_number,
              loan_amount, loan_date, receiving_account_number, date_payable,
              amount_payable, status
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <strong>Cột tuỳ chọn:</strong> address, company
            </Typography.Text>
          </div>

          <div className="mt-3 flex justify-end">
            <Button onClick={handleClose}>Hủy</Button>
          </div>
        </div>
      )}

      {step === ImportStep.Preview && preview && (
        <div>
          <div className="flex items-center gap-3 mb-3 px-4 py-3 bg-blue-50 rounded-xl border border-blue-100">
            <FileTextOutlined className="text-blue-500 text-2xl" />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 truncate">{file?.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">
                {formatBytes(file?.size ?? 0)}&nbsp;·&nbsp;
                <strong>{preview.totalRows.toLocaleString()}</strong> dòng dữ liệu&nbsp;·&nbsp;
                <strong>{preview.headers.length}</strong> cột
              </div>
            </div>
            <Button size="small" onClick={handleReset}>
              Chọn lại
            </Button>
          </div>

          <div className="mb-1">
            <Typography.Text className="text-sm font-medium text-gray-700">
              Xem trước toàn bộ dữ liệu{" "}
              <span className="text-gray-400 font-normal">
                ({preview.totalRows.toLocaleString()} dòng)
              </span>
            </Typography.Text>
          </div>
          <Table
            size="small"
            columns={previewColumns}
            dataSource={preview.rows.map((r) => ({ ...r, key: r._key }))}
            pagination={{
              pageSize: PREVIEW_PAGE_SIZE,
              showSizeChanger: false,
              showTotal: (total, range) => `${range[0]}–${range[1]} / ${total} dòng`,
              size: "small",
            }}
            scroll={{ x: "max-content" }}
            className="border border-gray-100 rounded-lg overflow-hidden"
            bordered
          />

          <div className="mt-4 flex justify-end gap-2">
            <Button onClick={handleClose}>Hủy</Button>
            <Button type="primary" onClick={handleUpload} loading={uploading}>
              Import {preview.totalRows.toLocaleString()} dòng
            </Button>
          </div>
        </div>
      )}

      {step === ImportStep.Processing && (
        <div className="text-center py-10">
          <Typography.Title level={5} className="mb-1">
            Đang xử lý: {jobStatus?.fileName || file?.name}
          </Typography.Title>
          {jobStatus && <div className="mb-3">{statusTag(jobStatus.status)}</div>}
          {jobStatus && jobStatus.totalRows > 0 ? (
            <>
              <Progress
                percent={progressPercent}
                status={jobStatus.status === "failed" ? "exception" : "active"}
                className="px-8"
              />
              <Typography.Text type="secondary" className="text-sm">
                Đã xử lý {jobStatus.processedRows.toLocaleString()}/
                {jobStatus.totalRows.toLocaleString()} dòng
              </Typography.Text>
            </>
          ) : (
            <Progress percent={0} status="active" className="px-8" />
          )}
          <p className="text-gray-400 text-sm mt-4">
            Vui lòng chờ, đừng đóng cửa sổ này…
          </p>
        </div>
      )}

      {step === ImportStep.Result && jobStatus && (
        <div>
          {jobStatus.status === "failed" ? (
            <Alert
              type="error"
              message="Import thất bại"
              description={jobStatus.failReason || "Có lỗi xảy ra khi xử lý file"}
              showIcon
              className="mb-4"
            />
          ) : (
            <Alert
              type="success"
              message="Import hoàn tất"
              description={`Đã import thành công ${jobStatus.inserted}/${jobStatus.totalRows} bản ghi`}
              showIcon
              className="mb-4"
            />
          )}

          <div className="flex gap-3 mb-4">
            <div className="flex-1 py-3 bg-green-50 rounded-xl text-center border border-green-100">
              <div className="text-2xl font-bold text-green-600">{jobStatus.inserted}</div>
              <div className="text-xs text-gray-500 mt-0.5">Thành công</div>
            </div>
            <div className="flex-1 py-3 bg-yellow-50 rounded-xl text-center border border-yellow-100">
              <div className="text-2xl font-bold text-yellow-500">
                {jobStatus.duplicates?.length || 0}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Trùng lặp</div>
            </div>
            <div className="flex-1 py-3 bg-red-50 rounded-xl text-center border border-red-100">
              <div className="text-2xl font-bold text-red-500">
                {jobStatus.errors?.length || 0}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">Lỗi</div>
            </div>
          </div>

          {jobStatus.duplicates?.length > 0 && (
            <div className="mb-3">
              <Typography.Text strong className="text-yellow-600 text-sm">
                <WarningOutlined className="mr-1" />
                Bản ghi trùng lặp ({jobStatus.duplicates.length}):
              </Typography.Text>
              <Table
                size="small"
                columns={resultColumns}
                dataSource={jobStatus.duplicates.map((d, i) => ({ ...d, key: i }))}
                pagination={{ pageSize: 5, size: "small" }}
                className="mt-1"
              />
            </div>
          )}

          {jobStatus.errors?.length > 0 && (
            <div>
              <Typography.Text strong className="text-red-500 text-sm">
                <CloseCircleOutlined className="mr-1" />
                Bản ghi lỗi ({jobStatus.errors.length}):
              </Typography.Text>
              <Table
                size="small"
                columns={resultColumns}
                dataSource={jobStatus.errors.map((e, i) => ({ ...e, key: i }))}
                pagination={{ pageSize: 5, size: "small" }}
                className="mt-1"
              />
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <Button type="primary" onClick={handleClose}>
              Đóng
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
