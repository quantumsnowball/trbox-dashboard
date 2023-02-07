import MenuBar from '@/components/MenuBar'
import ReduxWrapper from '@/redux/wrapper'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxWrapper>
      <MenuBar />
      <Component {...pageProps} />
    </ReduxWrapper>
  )
}
