"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="loading-state">
      <h1>เปิดหน้าสวนไม่สำเร็จ</h1>
      <p>ลองโหลดหน้านี้อีกครั้งนะคะ</p>
      <button className="button button-primary" onClick={reset}>
        ลองอีกครั้ง
      </button>
    </div>
  );
}
