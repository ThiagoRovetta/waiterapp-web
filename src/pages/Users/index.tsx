import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { User } from '../../types/User';
import { Title } from '../../components/Title';
import { Table } from '../../components/Table';
import { PencilIcon } from '../../components/Icons/PencilIcon';
import { TrashIcon } from '../../components/Icons/TrashIcon';
import { api } from '../../utils/api';
import { UserModal } from '../../components/UserModal';
import { DeleteUserModal } from '../../components/DeleteUserModal';
import { AuthContext } from '../../contexts/AuthContext';

interface FormDataType {
  name: string;
  email: string;
  role: 'ADMIN' | 'WAITER';
  password: string;
}

export function Users() {
  const { currentUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isDeleteUserModalVisible, setIsDeleteUserModalVisible] = useState(false);

  async function getUsers() {
    api.get('/users')
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error);
        setIsLoading(false);
      });
  }

  async function addUser({
    name, email, role, password
  }: FormDataType) {
    api.post('/users', { name, email, role, password })
      .then((response) => {
        toast.success('Usuário adicionado com sucesso!');

        const newUser = {
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          password: response.data.password,
          createdAt: response.data.createdAt,
        };

        setUsers((prevState) => [ ...prevState, newUser]);

        handleCloseUserModal();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  async function updateUser(id: string, {
    name, email, role, password
  }: FormDataType) {
    api.put(`/users/${id}`, { name, email, role, password })
      .then((response) => {
        toast.success('Usuário alterado com sucesso!');

        setUsers((prevState) => {
          const newState = [ ...prevState ];

          const index = newState.findIndex((u) => u._id === id);

          if (index > -1) {
            newState[index] = response.data;
          }

          return newState;
        });

        handleCloseUserModal();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  async function deleteUser(id: string) {
    api.delete(`/users/${id}`)
      .then(() => {
        toast.success('Usuário excluído com sucesso!');

        setUsers((prevState) => {
          const newState = [ ...prevState ];

          const index = newState.findIndex((u) => u._id === id);

          if (index > -1) {
            newState.splice(index, 1);
          }

          return newState;
        });

        handleCloseUserModal();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  function handleOpenUserModal(user?: User) {
    if (user) {
      setSelectedUser(user);
    }

    setIsUserModalVisible(true);
  }

  function handleCloseUserModal() {
    setSelectedUser(null);
    setIsUserModalVisible(false);
  }

  function handleOpenDeleteUserModal(user?: User) {
    if (user) {
      setSelectedUser(user);
    }

    setIsDeleteUserModalVisible(true);
  }

  function handleCloseDeleteUserModal() {
    setSelectedUser(null);
    setIsDeleteUserModalVisible(true);
  }

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <UserModal
        visible={isUserModalVisible}
        user={selectedUser}
        isLoading={false}
        onClose={handleCloseUserModal}
        onAddUser={addUser}
        onUpdateUser={updateUser}
        onDeleteUser={deleteUser}
      />

      <DeleteUserModal
        visible={isDeleteUserModalVisible}
        onClose={handleCloseDeleteUserModal}
        onDeleteUser={deleteUser}
        user={selectedUser}
      />

      <Title
        title='Usuários'
        quantity={users.length}
        label='Novo Usuário'
        onClick={() => handleOpenUserModal()}
      />

      <Table>
        <thead>
          <tr>
            <th style={{ width: '35%' }}>Nome</th>
            <th style={{ width: '30%' }}>E-mail</th>
            <th style={{ width: '30%' }}>Cargo</th>
            <th style={{ width: '5%' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role === 'ADMIN' ? 'Administrador' : 'Garçom'}</td>
              <td>
                <div className='actions'>
                  <button type='button' onClick={() => handleOpenUserModal(user)}>
                    <PencilIcon />
                  </button>
                  {currentUser?._id !== user._id && <button type='button' onClick={() => handleOpenDeleteUserModal(user)}>
                    <TrashIcon />
                  </button>}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
