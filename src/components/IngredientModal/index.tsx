import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Actions, Form, FormGroup, ModalBody, Overlay } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { Ingredient } from '../../types/Product';

interface IngredientModalProps {
  visible: boolean;
  onClose: () => void;
  onAddIngredient: (ingredient: Ingredient) => void;
  ingredients: Ingredient[];
}

export function IngredientModal({ visible, onClose, onAddIngredient, ingredients }: IngredientModalProps) {
  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);

  function handleAddIngredient() {
    if (ingredients.find((ingredient) => ingredient.name === name)) {
      setError(true);
      toast.info('Já existe um ingrediente com esse nome!');
    } else {
      setError(false);
      onAddIngredient({ icon, name });
      setIcon('');
      setName('');
      onClose();
    }
  }

  useEffect(() => {
    if (icon && name) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [icon, name]);

  if (!visible) {
    return null;
  }

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Novo Ingrediente</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>

        <Form>
          <FormGroup>
            <label htmlFor="emoji">Emoji</label>
            <input
              type="text"
              id='emoji'
              placeholder='Ex: 🧀'
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id='name'
              placeholder='Mussarela'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`${error ? 'error' : ''}`}
            />
          </FormGroup>
        </Form>

        <Actions>
          <button
            type="button"
            disabled={disabled}
            onClick={handleAddIngredient}
          >
            Salvar Alterações
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
