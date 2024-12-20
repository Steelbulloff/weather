import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Created by https://github.com/Steelbulloff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider
            theme={{
              components: {
                Typography: {
                  titleMarginTop: 0,
                  fontFamily: "Robot",
                  // titleMarginBottom: 0,
                  fontWeightStrong: 300,
                },
                Input: {
                  colorBgContainer: "transparent",
                  colorBorderBg: "none",
                  colorBorder: "transparent",
                  colorTextPlaceholder: "white",
                  addonBg: "transparent",
                  activeBorderColor: "none",
                  hoverBorderColor: "transaprent",
                  activeShadow: "none",
                },
                Button: {
                  colorBgContainer: "transparent",
                  colorBorderBg: "none",
                  colorBorder: "transparent",
                  colorTextPlaceholder: "white",
                },
              },
              token: {
                colorText: "rgba(255,255,255,1)",
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
