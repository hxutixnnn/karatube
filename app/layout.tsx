import { MantineProvider } from "@mantine/core";
import { theme } from "../theme";

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
// import classes from "./app.module.css";

export const metadata = {
  title: "Mantine Next.js template",
  description: "I am using Mantine with Next.js!",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" data-mantine-color-scheme="dark">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body
      // className={classes.body}
      >
        <MantineProvider theme={theme} defaultColorScheme="dark">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
