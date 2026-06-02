import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { CartProvider } from './stores/CartContext';
import { ToastProvider } from './stores/ToastContext';
import { ToastContainer } from './components/Toast/ToastContainer';

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRouter />
          <ToastContainer />
        </BrowserRouter>
      </CartProvider>
    </ToastProvider>
  )
}

export default App
