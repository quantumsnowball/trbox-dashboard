import MenuBar from '@/components/MenuBar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MenuBar />
      <Component {...pageProps} />
    </>
  )
}
