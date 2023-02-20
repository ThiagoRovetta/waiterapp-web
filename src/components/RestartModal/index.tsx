import { useContext, useEffect, useState } from 'react';

import { Actions, ModalBody, Overlay } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { RestartIcon } from '../Icons/RestartIcon';
import { OrdersContext } from '../../contexts/OrdersContext';
import { LoadingIcon } from '../Icons/LoadingIcon';

interface RestartModalProps {
  visible: boolean;
  onClose: () => void;
}

export function RestartModal({ visible, onClose }: RestartModalProps) {
  const { handleRestartDay } = useContext(OrdersContext);

  const [isLoading, setIsLoading] = useState(false);

  function handleRestart() {
    setIsLoading(true);

    handleRestartDay();

    onClose();

    setIsLoading(false);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isLoading) {
        if (event.key === 'Escape') {
          onClose();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <Overlay>
      <ModalBody>
        <header>
          <div className="title">
            <RestartIcon />
            <strong>Reiniciar o dia</strong>
          </div>

          <button type="button" onClick={onClose} disabled={isLoading}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>
        <div className="content">
          <p>Ao reiniciar o dia, todos os pedidos <br/> serão arquivados no status atual.</p>
          <p>Deseja reiniciar o dia?</p>
        </div>
        <Actions>
          <button
            type="button"
            className="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Não, continuar pedidos
          </button>

          <button
            type="button"
            className="primary"
            disabled={isLoading}
            onClick={handleRestart}
          >
            {isLoading ? <LoadingIcon /> : 'Sim, reiniciar dia'}
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
