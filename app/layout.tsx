import type { Metadata, Viewport } from "next";

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import Providers from "./Providers";
// import classes from "./app.module.css";

export const metadata: Metadata = {
  title: "KaraTube | Free Karaoke YouTube Online",
  description: "Free Karaoke YouTube Online",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" data-mantine-color-scheme="dark">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body
      // className={classes.body}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
