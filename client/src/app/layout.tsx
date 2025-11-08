import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { AppProvider } from "@/context/appContext";


export const metadata: Metadata = {
  title: "Chat App",
  description: "A real-time chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
        <Toaster/>
      </body>
    </html>
  );
}
