import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { ui } from "@/lib/locale";
import { gardenDataService } from "@/services/garden-service";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Grandma Garden Watch · ดูแลสวนของคุณยาย",
    template: "%s | Grandma Garden Watch",
  },
  description: `${ui.th.subtitle} · เวอร์ชันสาธิตที่ใช้ข้อมูลสมมติ`,
  robots: { index: false, follow: false },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { garden } = await gardenDataService.getSnapshot();
  return (
    <html lang="th">
      <body>
        <AppShell garden={garden}>{children}</AppShell>
      </body>
    </html>
  );
}
