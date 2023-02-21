import { useContext, useEffect, useState } from 'react';

import { OrdersContext } from '../../contexts/OrdersContext';
import { Order } from '../../types/Order';
import { OrderModal } from '../../components/OrderModal';
import { Title } from '../../components/Title';
import { Table } from '../../components/Table';
import { FilterIcon } from '../../components/Icons/FilterIcon';
import { EyeIcon } from '../../components/Icons/EyeIcon';
import { TrashIcon } from '../../components/Icons/TrashIcon';

export function History() {
  const { archivedOrders, handleGetArchivedOrders, handleDeleteArchivedOrder } = useContext(OrdersContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>({} as Order);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleGetArchivedOrders();
  }, []);

  function handleOpenModal(order: Order, viewOnly = false) {
    setIsViewOnly(viewOnly);
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder({} as Order);
  }

  async function deleteOrder() {
    setIsLoading(true);

    handleDeleteArchivedOrder(selectedOrder);

    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderModal
        archived
        viewOnly={isViewOnly}
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={deleteOrder}
        isLoading={isLoading}
      />

      <Title title='Pedidos' quantity={archivedOrders.length} />
      <Table>
        <thead>
          <tr>
            <th>Mesa</th>
            <th className='filter'>
              <button type='button' onClick={() => console.log('open calendar')}>
                Data <FilterIcon />
              </button>
            </th>
            <th>Nome</th>
            <th style={{ width: '240px' }}>Categoria</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {archivedOrders.map(order => (
            <tr key={order._id}>
              <td>{order.table}</td>
              <td>{new Intl.DateTimeFormat('pt-BR')
                .format(new Date(order.createdAt))}</td>
              <td>{order.products.map(product => product.product.name).join(', ')}</td>
              <td>{order.products.map(product => `${product.product.category?.icon} ${product.product.category?.name}`).join(', ')}</td>
              <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                .format(order.products.reduce((total, { product, quantity }) => {
                  return total + (product.price * quantity);
                }, 0))}
              </td>
              <td>
                <div className="actions">
                  <button type="button" onClick={() => handleOpenModal(order, true)}>
                    <EyeIcon />
                  </button>
                  <button type="button" onClick={() => handleOpenModal(order)}>
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
