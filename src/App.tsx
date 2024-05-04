import { BrowserRouter } from 'react-router-dom'
import RouterApp from './RouterApp'
import { ModalsProvider } from './modules/Modals/provider/ModalProvider'
import { NotificationsProvider } from './modules/PushNotifications/provider/PushNotification'
import { CacheProvider } from '@emotion/react'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'
import createCache from '@emotion/cache'
import { ThemeProvider } from '@mui/material'
import theme from './styles/mui'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
})

function App() {
  return (
    <BrowserRouter>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="he">
            <ModalsProvider>
              <NotificationsProvider>
                <RouterApp />
              </NotificationsProvider>
            </ModalsProvider>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </BrowserRouter>
  )
}

export default App
