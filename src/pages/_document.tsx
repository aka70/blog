import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="aka's blog" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
