import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Container, Content } from './styles';
import { HomeIcon } from '../Icons/HomeIcon';
import { RestartIcon } from '../Icons/RestartIcon';
import { RestartModal } from '../RestartModal';

interface PageDetails {
  [args: string]: {
    name: string;
    description: string;
    Icon: React.FC
  }
}

const pageDetails: PageDetails = {
  home: {
    name: 'Home',
    description: 'Acompanhe os pedidos dos clientes',
    Icon: HomeIcon
  }
};

export function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const location = useLocation();

  const { Icon, name, description } = pageDetails[location.pathname.replace('/', '')];

  function handleOpenModal() {
    setIsModalVisible(true);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  return (
    <Container>
      <RestartModal
        visible={isModalVisible}
        onClose={handleCloseModal}
      />

      <Content>
        <div className="page-details">
          <div>
            <Icon />
            <h1>{name}</h1>
          </div>
          <h2>{description}</h2>
        </div>
        {location.pathname.includes('home') && (
          <button type='button' onClick={handleOpenModal}>
            <RestartIcon /> Reiniciar o dia
          </button>
        )}
      </Content>
    </Container>
  );
}
