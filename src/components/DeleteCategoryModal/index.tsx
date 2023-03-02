import { useState } from 'react';

import { Actions, Body, ModalBody, Overlay, CategoryContainer } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { Category } from '../../types/Category';

interface DeleteCategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onDeleteCategory: (id: string) => void;
  category: Category | null;
}

export function DeleteCategoryModal({ visible, onClose, onDeleteCategory, category }: DeleteCategoryModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);

    onDeleteCategory(category!._id);

    setIsLoading(false);

    onClose();
  }

  if (!visible || !category) {
    return null;
  }

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Excluir Categoria</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>

        <Body>
          <p>Tem certeza que deseja excluir a categoria?</p>
          <CategoryContainer>
            <p>{category.icon}</p>
            <p>{category.name}</p>
          </CategoryContainer>
        </Body>

        <Actions>
          <button
            type="button"
            className="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Manter categoria
          </button>

          <button
            type="button"
            className="primary"
            disabled={isLoading}
            onClick={handleDelete}
          >
            Excluir categoria
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
