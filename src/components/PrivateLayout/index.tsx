import { useContext } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

import { Container, Content } from './styles';

import { AuthContext } from '../../contexts/AuthContext';
import { Header } from '../Header';
import { Menu } from '../Menu';

export function PrivateLayout() {
  const { authenticated } = useContext(AuthContext);
  const location = useLocation();

  if (!authenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return (
    <Container>
      <Menu />
      <Content>
        <Header />
        <Outlet />
      </Content>
    </Container>
  );
}
