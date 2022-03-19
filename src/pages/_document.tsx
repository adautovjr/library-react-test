import React from 'react'
import Document, {
  DocumentInitialProps,
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () => originalRenderPage()

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: <>{initialProps.styles}</>
      }
    } finally {
    }
  }

  render() {
    return (
      <Html lang="pt" className="h-full bg-gray-50">
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:400,500,700"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </Head>
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
