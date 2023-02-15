import logo from '../../assets/images/logo2.svg';

import { Container } from './styles';

export function Splash() {
  return (
    <Container>
      <img src={logo} alt="WAITERAPP" />
    </Container>
  );
}
