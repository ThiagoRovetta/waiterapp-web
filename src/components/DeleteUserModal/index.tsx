import { useState } from 'react';

import { Actions, Body, Form, FormGroup, ModalBody, Overlay } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { User } from '../../types/User';

interface DeleteUserModalProps {
  visible: boolean;
  onClose: () => void;
  onDeleteUser: (id: string) => void;
  user: User | null;
}

export function DeleteUserModal({ visible, onClose, onDeleteUser, user }: DeleteUserModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);

    onDeleteUser(user!._id);

    setIsLoading(false);

    onClose();
  }

  if (!visible || !user) {
    return null;
  }

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Excluir Usuário</strong>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Ícone de fechar" />
          </button>
        </header>

        <Body>
          <p>Tem certeza que deseja excluir o usuário?</p>
          <Form>
            <FormGroup>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id='name'
                placeholder="Fulano de Tal"
                value={user.name}
                disabled
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id='email'
                placeholder="fulano@gmail.com"
                value={user.email}
                disabled
              />
            </FormGroup>
          </Form>
        </Body>

        <Actions>
          <button
            type="button"
            className="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            Manter Usuário
          </button>

          <button
            type="button"
            className="primary"
            disabled={isLoading}
            onClick={handleDelete}
          >
            Excluir Usuário
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
