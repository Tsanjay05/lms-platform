import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduPulse LMS | Modern Learning & Live Classes Platform",
  description:
    "Empower your learning journey with interactive on-demand courses, structured modules, and real-time live classes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
