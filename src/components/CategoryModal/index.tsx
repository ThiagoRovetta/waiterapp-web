import { useEffect, useState } from 'react';

import { Actions, Form, FormGroup, ModalBody, Overlay } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { Category } from '../../types/Category';
import { DeleteCategoryModal } from '../DeleteCategoryModal';

interface FormDataType {
  icon: string;
  name: string;
}

interface CategoryModalProps {
  visible: boolean;
  category: Category | null;
  isLoading: boolean;
  onClose: () => void;
  onAddCategory: (payload: FormDataType) => Promise<void>;
  onUpdateCategory: (id: string, payload: FormDataType) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
}

export function CategoryModal({
  visible,
  category,
  isLoading,
  onClose,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory
}: CategoryModalProps) {
  const [icon, setIcon] = useState(category?.icon || '');
  const [name, setName] = useState(category?.name || '');
  const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);

  async function handleAddCategory() {
    onAddCategory({
      icon,
      name
    });
  }

  async function handleUpdateCategory() {
    onUpdateCategory(category!._id, {
      icon,
      name
    });
  }

  async function handleDeleteCategory(id: string) {
    onDeleteCategory(id);
  }

  function handleCloseDeleteCategoryModal() {
    setIsDeleteCategoryModalOpen(false);
  }

  useEffect(() => {
    setIcon(category?.icon || '');
    setName(category?.name || '');
  }, [category]);

  useEffect(() => {
    if (category) {
      if (category.icon !== icon || category.name !== name) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      if (icon !== '' && name !== '') {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [icon, name]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <Overlay>
        <ModalBody>
          <header>
            <strong>
              {category ? 'Editar Categoria' : 'Nova Categoria'}
            </strong>

            <button type="button" onClick={onClose}>
              <img src={closeIcon} alt="Ícone de fechar" />
            </button>
          </header>

          <Form>
            <FormGroup>
              <label htmlFor="icon">Emoji</label>
              <input
                type="text"
                id='icon'
                name='icon'
                placeholder='Ex: 🧀'
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="name">Nome da Categoria</label>
              <input
                type="text"
                id='name'
                name='name'
                placeholder='Ex: Lanches'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
          </Form>

          <Actions className={`${category ? '' : 'add-mode'}`}>
            {
              category && (
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsDeleteCategoryModalOpen(true)}
                  disabled={isLoading}
                >
                  Excluir Categoria
                </button>
              )
            }

            <button
              type="button"
              className='primary'
              disabled={isLoading || disabled}
              onClick={() => category ? handleUpdateCategory() : handleAddCategory()}
            >
              {category ? 'Salvar Alterações' : 'Adicionar Categoria'}
            </button>
          </Actions>
        </ModalBody>

        <DeleteCategoryModal
          visible={isDeleteCategoryModalOpen}
          onClose={handleCloseDeleteCategoryModal}
          onDeleteCategory={handleDeleteCategory}
          category={category}
        />

      </Overlay>
    </>
  );
}
