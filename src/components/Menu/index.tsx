import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Container, GroupedItems, NavContainer } from './styles';

import { AuthContext } from '../../contexts/AuthContext';
import { HomeIcon } from '../Icons/HomeIcon';
import { HistoryIcon } from '../Icons/HistoryIcon';
import { MenuIcon } from '../Icons/MenuIcon';
import { UsersIcon } from '../Icons/UsersIcon';
import { ProfileIcon } from '../Icons/ProfileIcon';
import { LogoutIcon } from '../Icons/LogoutIcon';

export function Menu() {
  const { handleLogout } = useContext(AuthContext);

  const location = useLocation();

  return (
    <Container>
      <h5><b>W</b>A</h5>
      <GroupedItems>
        <NavContainer className={`${location.pathname.includes('home') ? 'active' : ''}`}>
          <Link to="home">
            <HomeIcon />
            <p>Home</p>
          </Link>
        </NavContainer>
        <NavContainer className={`${location.pathname.includes('history') ? 'active' : ''}`}>
          <Link to="history">
            <HistoryIcon />
            <p>Histórico</p>
          </Link>
        </NavContainer>
        <NavContainer className={`${location.pathname.includes('menu') ? 'active' : ''}`}>
          <Link to="menu">
            <MenuIcon />
            <p>Cardápio</p>
          </Link>
        </NavContainer>
        <NavContainer className={`${location.pathname.includes('users') ? 'active' : ''}`}>
          <Link to="users">
            <UsersIcon />
            <p>Usuários</p>
          </Link>
        </NavContainer>
      </GroupedItems>
      <GroupedItems>
        <NavContainer className={`${location.pathname.includes('my_profile') ? 'active' : ''}`}>
          <Link to="my_profile">
            <ProfileIcon />
            <p>Meu Perfil</p>
          </Link>
        </NavContainer>
        <NavContainer onClick={handleLogout}>
          <LogoutIcon />
          <p>Sair</p>
        </NavContainer>
      </GroupedItems>
    </Container>
  );
}
