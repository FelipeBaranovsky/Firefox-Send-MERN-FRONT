import 'globals.css';
import AuthState from '@/context/auth/authState';
import AppState from '@/context/app/appState';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {

  return (
    <AuthState>
      <AppState>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"

        />
        <Component {...pageProps} />
      </AppState>
    </AuthState>
  )
}
