import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/global.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <title>
          Hát Karaoke Youtube Online Miễn Phí - Karaoke Youtube Online
        </title>
        <meta
          name="title"
          content="Hát Karaoke Youtube Online Miễn Phí - Karaoke Youtube Online"
        />
        <meta
          name="description"
          content="Phần mềm hát karaoke online miễn phí, không cần cài đặt, chạy trực tiếp trên trình duyệt. Tương thích nhiều thiết bị, kho dữ liệu bài hát từ Youtube đầy đủ, chất lượng cao."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://karatube.online/" />
        <meta
          property="og:title"
          content="Hát Karaoke Youtube Online Miễn Phí - Karaoke Youtube Online"
        />
        <meta
          property="og:description"
          content="Phần mềm hát karaoke online miễn phí, không cần cài đặt, chạy trực tiếp trên trình duyệt. Tương thích nhiều thiết bị, kho dữ liệu bài hát từ Youtube đầy đủ, chất lượng cao."
        />
        <meta property="og:image" content="/assets/og-image.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://karatube.online/" />
        <meta
          property="twitter:title"
          content="Hát Karaoke Youtube Online Miễn Phí - Karaoke Youtube Online"
        />
        <meta
          property="twitter:description"
          content="Phần mềm hát karaoke online miễn phí, không cần cài đặt, chạy trực tiếp trên trình duyệt. Tương thích nhiều thiết bị, kho dữ liệu bài hát từ Youtube đầy đủ, chất lượng cao."
        />
        <meta property="twitter:image" content="/assets/og-image.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ef4444" />
        <meta name="robots" content="all" />
      </Head>
      {process.env.NODE_ENV !== "production" ? null : (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-DTYZ1GLQQC"
            strategy="worker"
          />
          <Script id="google-analytics" strategy="worker">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-DTYZ1GLQQC');
        `}
          </Script>
        </>
      )}
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
      <Analytics />
    </>
  );
}

export default App;
