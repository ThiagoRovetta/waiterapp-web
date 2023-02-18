import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Container } from './styles';
import logo from '../../assets/images/logo2.svg';
import { api } from '../../utils/api';

export function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/profile')
      .then(() => {
        navigate('/home');
      })
      .catch(() => {
        navigate('/login');
      });
  }, []);

  return (
    <Container>
      <img src={logo} alt="WAITERAPP" />
    </Container>
  );
}
