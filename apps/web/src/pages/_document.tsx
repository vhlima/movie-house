import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />

          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />

          <meta name="description" content="The coolest movie fan website" />
          <meta name="og:description" content="The coolest movie fan website" />
          <meta name="og:type" content="website" />
          <meta name="og:title" content="MovieHouse" />
          <meta name="og:locale" content="en_US" />
          <meta name="robots" content="index,follow" />
          <meta name="googlebot" content="index,follow" />
        </Head>

        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
