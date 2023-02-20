import { useContext } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

import { Container } from './styles';

import { AuthContext } from '../../contexts/AuthContext';
import { Header } from '../Header';
import { Menu } from '../Menu';
import { Orders } from '../Orders';

export function PrivateLayout() {
  const { authenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return (
    <Container>
      <Menu />
      <Header />
      <Orders />
      <Outlet />
    </Container>
  );
}
