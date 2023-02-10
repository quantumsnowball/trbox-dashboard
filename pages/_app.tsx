import MenuBar from '@/components/MenuBar'
import ReduxWrapper from '@/redux/wrapper'
import '@/styles/globals.css'
import ThemeWrapper from '@/styles/wrapper'
import type { AppProps } from 'next/app'
import { withRouter } from 'next/router'
import { useEffect } from 'react'

function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    router.push(window.location.pathname)
  }, [])

  return (
    <ReduxWrapper>
      <ThemeWrapper>
        <MenuBar />
        <Component {...pageProps} />
      </ThemeWrapper>
    </ReduxWrapper>
  )
}

export default withRouter(App)
