import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className="bg-[#fafafa] dark:bg-[#111111]">
        <Navbar/>
        <Component {...pageProps} />
      </div>
  )
}
