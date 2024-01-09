import ThemeProvider from './theme'
import { server } from "./utils/server"
import Router from './routes'
import { SnackbarProvider } from 'notistack'
import { authHeader } from './helpers/authHeader'

console.log = function () { }

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
      <SnackbarProvider maxSnack={3}>
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App;
