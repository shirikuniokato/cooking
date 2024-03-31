"use client";
import { useEffect } from "react";
import Link from "next/link";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

export type ALERT_TYPE = {
  level: "info" | "warn" | "error";
  message: string;
  link?: string;
};

type AlertComponentProps = {
  alertParams: ALERT_TYPE;
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
};

export const Alert: React.FC<AlertComponentProps> = ({
  alertParams,
  showAlert,
  setShowAlert,
}) => {
  useEffect(() => {
    if (showAlert) {
      // アラートを表示後、x秒後に非表示に設定
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000); // 3秒後に非表示

      // コンポーネントのクリーンアップ時にタイマーをクリア
      return () => clearTimeout(timer);
    }
  }, [showAlert, setShowAlert]);

  return (
    <div className="fixed top-[100px] right-[20px] z-50 slideinRight">
      {alertParams.level === "info" ? (
        <InfoAlert alertParams={alertParams} />
      ) : (
        <ErrorAlert alertParams={alertParams} />
      )}
    </div>
  );
};

const InfoAlert = ({ alertParams }: { alertParams: ALERT_TYPE }) => {
  return (
    <>
      <div className="alert-box alert-box-info">
        <div className="alert-icon-info">
          <AiFillCheckCircle className="text-3xl" />
        </div>
        <div className="alert-message-info">
          <span>{alertParams.message} </span>
          {alertParams.link && (
            <Link
              href={alertParams.link}
              target="_blank"
              className="pl-1 alert-message-info underline hover:no-underline"
            >
              詳細
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

const ErrorAlert = ({ alertParams }: { alertParams: ALERT_TYPE }) => {
  return (
    <>
      <div className="alert-box alert-box-error">
        <div className="alert-icon-error">
          <AiFillCloseCircle className="text-3xl" />
        </div>
        <div className="alert-message-error">
          <span>{alertParams.message}</span>
          <br />
          {alertParams.link && (
            <Link
              href={alertParams.link}
              target="_blank"
              className="underline hover:no-underline"
            >
              詳細
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
