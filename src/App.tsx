import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyles } from './styles/GlobalStyles';

import { AuthProvider } from './contexts/AuthContext';
import { Splash } from './pages/Splash';
import { Login } from './pages/Login';
import { PrivateLayout } from './components/PrivateLayout';
import { Home } from './pages/Home';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyles />
        <ToastContainer position="bottom-center" />
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateLayout />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
