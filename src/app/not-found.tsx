import Link from "next/link";

export default function NotFound() {
  return (
    <div className="loading-state">
      <span className="eyebrow">404</span>
      <h1>ไม่พบหน้าที่ต้องการ</h1>
      <p>กลับไปดูภาพรวมของสวนได้เลยค่ะ</p>
      <Link className="button button-primary" href="/">
        กลับหน้าภาพรวม
      </Link>
    </div>
  );
}
