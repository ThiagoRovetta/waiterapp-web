import { useState } from 'react';

import { Actions, Body, ModalBody, Overlay, ProductContainer } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { Product } from '../../types/Product';
import { formatCurrency } from '../../utils/formatCurrency';

interface DeleteProductModalProps {
  visible: boolean;
  onClose: () => void;
  onDeleteProduct: (id: string) => void;
  product: Product | null;
}

export function DeleteProductModal({ visible, onClose, onDeleteProduct, product }: DeleteProductModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);

    onDeleteProduct(product!._id);

    setIsLoading(false);

    onClose();
  }

  if (!visible || !product) {
    return null;
  }

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Excluir Produto</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>

        <Body>
          <p>Tem certeza que deseja excluir o produto?</p>
          <ProductContainer>
            <div className="product">
              <img src={`http://localhost:3001/uploads/${product.imagePath}`} alt={product.name} />
              <div>
                <div className="category">
                  <p>{product.category.icon}</p>
                  <p>{product.category.name}</p>
                </div>
                <p className='name'>{product.name}</p>
                <p>{formatCurrency(product.price)}</p>
              </div>
            </div>
          </ProductContainer>
        </Body>

        <Actions>
          <button
            type="button"
            className="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Manter produto
          </button>

          <button
            type="button"
            className="primary"
            disabled={isLoading}
            onClick={handleDelete}
          >
            Excluir produto
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
