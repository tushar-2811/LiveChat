import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { AppProvider } from "@/context/appContext";
import { SocketProvider } from "@/context/socketContext";


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
          <SocketProvider>
            {children}
          </SocketProvider>
        </AppProvider>
        <Toaster />
      </body>
    </html>
  );
}
