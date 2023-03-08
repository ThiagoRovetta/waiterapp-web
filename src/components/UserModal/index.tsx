

import { Actions, Form, FormGroup, ModalBody, Overlay, PasswordContainer, RadioContainer, RadioGroup } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { User } from '../../types/User';
import { useContext, useEffect, useState } from 'react';
import { EyeHiddenIcon } from '../Icons/EyeHiddenIcon';
import { EyeIcon } from '../Icons/EyeIcon';
import { AuthContext } from '../../contexts/AuthContext';
import { DeleteUserModal } from '../DeleteUserModal';

interface FormDataType {
  name: string;
  email: string;
  role: 'ADMIN' | 'WAITER';
  password: string;
}

interface UserModalProps {
  visible: boolean;
  user: User | null;
  isLoading: boolean;
  onClose: () => void;
  onAddUser: (payload: FormDataType) => Promise<void>;
  onUpdateUser: (id: string, payload: FormDataType) => Promise<void>;
  onDeleteUser: (id: string) => Promise<void>;
}

export function UserModal({
  visible,
  user,
  isLoading,
  onClose,
  onAddUser,
  onUpdateUser,
  onDeleteUser
}: UserModalProps) {
  const { currentUser } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'ADMIN' | 'WAITER' | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  function toggle() {
    setShowPassword(!showPassword);
  }

  function handleCloseDeleteUserModal() {
    setIsDeleteUserModalOpen(false);
  }

  async function handleAddUser() {
    onAddUser({
      name,
      email,
      password,
      role: role === null ? 'WAITER' : role,
    });
  }

  async function handleUpdateUser() {
    onUpdateUser(user!._id, {
      name,
      email,
      password,
      role: role === null ? 'WAITER' : role,
    });
  }

  async function handleDeleteUser(id: string) {
    onDeleteUser(id);
  }

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

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPassword('');
      setRole(user.role);
    } else {
      setName('');
      setEmail('');
      setPassword('');
      setRole(null);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      if (
        user.name !== name
        || user.email !== email
        || password !== ''
        || user.role !== role
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      if (
        name !== ''
        && email !== ''
        && password !== ''
        && role !== null
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [name, email, password, role]);

  if (!visible) {
    return null;
  }

  return (
    <>
      <Overlay>
        <ModalBody>
          <header>
            <strong>
              {user ? 'Editar Usuário' : 'Novo Usuário'}
            </strong>

            <button type="button" onClick={onClose}>
              <img src={closeIcon} alt="Ícone de fechar" />
            </button>
          </header>

          <Form>
            <FormGroup>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id='name'
                placeholder="Fulano de Tal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id='email'
                placeholder="fulano@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor='password'>Senha</label>
              <PasswordContainer>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id='password'
                  name='password'
                  placeholder='****'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? <EyeHiddenIcon onClick={toggle} /> : <EyeIcon onClick={toggle} />}
              </PasswordContainer>
            </FormGroup>
            {currentUser?._id !== user?._id && <FormGroup>
              <label htmlFor="role">Tipo</label>
              <RadioContainer>
                <RadioGroup>
                  <input
                    type="radio"
                    id='ADMIN'
                    name="role"
                    checked={role === 'ADMIN'}
                    onChange={() => setRole('ADMIN')}
                  />
                  <label htmlFor="admin">Admin</label>
                </RadioGroup>
                <RadioGroup>
                  <input
                    type="radio"
                    id='waiter'
                    name="role"
                    checked={role === 'WAITER'}
                    onChange={() => setRole('WAITER')}
                  />
                  <label htmlFor="waiter">Garçom</label>
                </RadioGroup>
              </RadioContainer>
            </FormGroup>}
          </Form>

          <Actions className={`${user && currentUser?._id !== user?._id ? '' : 'add-mode'}`}>
            {
              user && currentUser?._id !== user?._id && (
                <button
                  type="button"
                  className="secondary"
                  onClick={() => setIsDeleteUserModalOpen(true)}
                  disabled={isLoading}
                >
                  Excluir Usuário
                </button>
              )
            }

            <button
              type="button"
              className='primary'
              disabled={isLoading || disabled}
              onClick={() => user ? handleUpdateUser() : handleAddUser()}
            >
              {user ? 'Salvar Alterações' : 'Adicionar Usuário'}
            </button>
          </Actions>
        </ModalBody>

        <DeleteUserModal
          visible={isDeleteUserModalOpen}
          onClose={handleCloseDeleteUserModal}
          onDeleteUser={handleDeleteUser}
          user={user}
        />
      </Overlay>
    </>
  );
}
