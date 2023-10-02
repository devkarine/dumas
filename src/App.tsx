import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { ThemeProviderContext } from './contexts/themeContext';
import { GlobalStyle } from './styles/global';
import { AuthProvider } from './contexts/authContext';
import { CartProviderContext } from './contexts/cartContex';
import { QueryClientProvider } from 'react-query';
import queryClient from './service/reactQuery/queryClient';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <ThemeProviderContext>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AuthProvider>
            <CartProviderContext>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />

              <GlobalStyle />
              <AppRoutes />
            </CartProviderContext>
          </AuthProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProviderContext>
  );
}

export default App;
