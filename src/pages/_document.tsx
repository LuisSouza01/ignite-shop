import { Html, Head, Main, NextScript } from "next/document";

import { getCssText } from "@/styles";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />

        <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />

        <meta charSet="UTF-8"></meta>
        <meta name="description" content="Free Web tutorials"></meta>
        <meta name="keywords" content="HTML, CSS, JavaScript"></meta>
        <meta name="author" content="John Doe"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
