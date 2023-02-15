import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { GlobalStyles } from './styles/GlobalStyles';

import { Header } from './components/Header';
import { Orders } from './components/Orders';
import { Splash } from './pages/Splash';


export function App() {
  return (
    <>
      <GlobalStyles />
      {/* <Header />
      <Orders /> */}
      <Splash />
      <ToastContainer position="bottom-center" />
    </>
  );
}
