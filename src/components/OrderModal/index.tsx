import { useEffect } from 'react';

import { Overlay, ModalBody, OrderDetails, Actions } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
  onChangeOrderStatus?: () => void;
  archived?: boolean;
  viewOnly?: boolean;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChangeOrderStatus,
  archived = false,
  viewOnly = false,
}: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + (product.price * quantity);
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>

        <div className="status-container">
          {archived ? (
            <>
              <small>Data do pedido</small>
              <div>
                <strong>
                  {formatDate(new Date(order.createdAt))}
                </strong>
              </div>
            </>
          ) : (
            <>
              <small>Status do pedido</small>
              <div>
                <span>
                  {order.status === 'WAITING' && '🕒'}
                  {order.status === 'IN_PRODUCTION' && '🧑‍🍳'}
                  {order.status === 'DONE' && '✅'}
                </span>

                <strong>
                  {order.status === 'WAITING' && 'Fila de espera'}
                  {order.status === 'IN_PRODUCTION' && 'Em preparação'}
                  {order.status === 'DONE' && 'Pronto!'}
                </strong>
              </div>
            </>
          )}
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${product.imagePath}`}
                  alt={product.name}
                  width="48"
                  height="40"
                />

                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        {!viewOnly && (
          <Actions>
            <button
              type="button"
              className="secondary"
              onClick={onCancelOrder}
              disabled={isLoading}
            >
              {archived ? 'Excluir registro' : 'Cancelar pedido'}
            </button>

            {order.status !== 'DONE' && !archived && (
              <button
                type="button"
                className="primary"
                disabled={isLoading}
                onClick={onChangeOrderStatus}
              >
                <span>
                  {order.status === 'WAITING' && 'Iniciar Produção'}
                  {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
                </span>
              </button>
            )}
          </Actions>
        )}
      </ModalBody>
    </Overlay>
  );
}
