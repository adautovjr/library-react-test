import Head from 'next/head'
import 'tailwindcss/tailwind.css'
import { AuthProvider } from '../contexts/AuthContext'
import '../assets/style.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
