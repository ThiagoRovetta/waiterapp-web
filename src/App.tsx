import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyles } from './styles/GlobalStyles';

import { AuthProvider } from './contexts/AuthContext';
import { Splash } from './pages/Splash';
import { Login } from './pages/Login';
import { PrivateLayout } from './components/PrivateLayout';
import { Home } from './pages/Home';
import { OrdersProvider } from './contexts/OrdersContext';
import { History } from './pages/History';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyles />
        <ToastContainer position="bottom-center"
          style={{
            width: '360px',
            fontWeight: 400,
            fontSize: '14px',
            color: '#666666'
          }}
          bodyStyle={{
            width: '240px',
          }}
        />
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route element={
            <OrdersProvider>
              <PrivateLayout />
            </OrdersProvider>
          }>
            <Route path="/home" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
