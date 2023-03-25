import { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { Table } from '../../components/Table';
import { PencilIcon } from '../../components/Icons/PencilIcon';
import { UserModal } from '../../components/UserModal';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../utils/api';

interface FormDataType {
  name: string;
  email: string;
  role: 'ADMIN' | 'WAITER';
  password: string;
}

export function Profile() {
  const { currentUser, updateCurrentUser } = useContext(AuthContext);

  const [isUserModalVisible, setIsUserModalVisible] = useState(false);

  async function addUser({
    name, email, role, password
  }: FormDataType) {
    console.log(name, email, role, password);
  }

  async function updateUser(id: string, {
    name, email, role, password
  }: FormDataType) {
    api.put(`/users/${id}`, { name, email, role, password })
      .then((response) => {
        toast.success('Usuário alterado com sucesso!');

        updateCurrentUser(response.data);

        handleCloseUserModal();
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  async function deleteUser(id: string) {
    console.log(id);
  }

  function handleOpenUserModal() {
    setIsUserModalVisible(true);
  }

  function handleCloseUserModal() {
    setIsUserModalVisible(false);
  }

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <UserModal
        visible={isUserModalVisible}
        user={currentUser}
        isLoading={false}
        onClose={handleCloseUserModal}
        onAddUser={addUser}
        onUpdateUser={updateUser}
        onDeleteUser={deleteUser}
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
          <tr key={currentUser?._id}>
            <td>{currentUser?.name}</td>
            <td>{currentUser?.email}</td>
            <td>{currentUser?.role === 'ADMIN' ? 'Administrador' : 'Garçom'}</td>
            <td>
              <div className='actions'>
                <button type='button' onClick={() => handleOpenUserModal()}>
                  <PencilIcon />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
