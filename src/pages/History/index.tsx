import { useContext, useEffect, useState } from 'react';

import { OrdersContext } from '../../contexts/OrdersContext';
import { Order } from '../../types/Order';
import { OrderModal } from '../../components/OrderModal';
import { Title } from '../../components/Title';
import { Table } from '../../components/Table';
import { FilterIcon } from '../../components/Icons/FilterIcon';
import { EyeIcon } from '../../components/Icons/EyeIcon';
import { TrashIcon } from '../../components/Icons/TrashIcon';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatDate } from '../../utils/formatDate';

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
            <th style={{ width: '5%' }}>Mesa</th>
            <th style={{ width: '5%' }} className='filter'>
              <button type='button' onClick={() => console.log('open calendar')}>
                Data <FilterIcon />
              </button>
            </th>
            <th style={{ width: '35%' }}>Nome</th>
            <th style={{ width: '25%' }}>Categoria</th>
            <th style={{ width: '25%' }}>Total</th>
            <th style={{ width: '5%' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {archivedOrders.map(order => (
            <tr key={order._id}>
              <td>{order.table}</td>
              <td>{formatDate(new Date(order.createdAt))}</td>
              <td>{order.products.map(product => product.product.name).join(', ')}</td>
              <td>{order.products.map(product => `${product.product.category?.icon} ${product.product.category?.name}`).join(', ')}</td>
              <td>{formatCurrency(order.products.reduce((total, { product, quantity }) => {
                return total + (product.price * quantity);
              }, 0))}
              </td>
              <td>
                <div className="actions">
                  <button type="button" onClick={() => handleOpenModal(order, true)}>
                    <EyeIcon onClick={() => console.log()} />
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
