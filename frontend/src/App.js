import ThemeProvider from './theme'
import { server } from "./utils/server"
import Router from './routes'
import { SnackbarProvider } from 'notistack'
import { authHeader } from './helpers/authHeader'
import { Provider } from 'react-redux'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './redux/store'
let persistor = persistStore(store)

// console.log = function () { }

const interCeptor = () => {
  server.interceptors.request.use((config) => {
    const token = authHeader();
    config.headers.Authorization = token;
    return config;
  }, null, { synchronous: true });
}

const App = () => {
  interCeptor()
  return (
    <ThemeProvider>
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          <SnackbarProvider maxSnack={3}>
            <Router />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default App;
