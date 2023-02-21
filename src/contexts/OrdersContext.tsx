import { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import socketIo from 'socket.io-client';

import { Order } from '../types/Order';
import { api } from '../utils/api';

interface OrdersProviderProps {
  children: ReactNode;
}

interface OrdersContextData {
	orders: Order[];
  handleGetOrders: () => void;
	handleCancelOrder: (order: Order) => void;
	handleChangeOrderStatus: (order: Order) => void;
  handleRestartDay: () => void;
	archivedOrders: Order[];
  handleGetArchivedOrders: () => void;
  handleDeleteArchivedOrder: (order: Order) => void;
}

export const OrdersContext = createContext<OrdersContextData>({} as OrdersContextData);

export function OrdersProvider({ children }: OrdersProviderProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [archivedOrders, setArchivedOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      setOrders(prevState => prevState.concat(order));
    });
  }, []);

  async function handleGetOrders() {
    api.get('/orders')
      .then(({ data }) => {
        setOrders(data);
      });
  }

  async function handleGetArchivedOrders() {
    api.get('/orders', {
      params: {
        archived: true
      }
    })
      .then(({ data }) => {
        setArchivedOrders(data);
      });
  }

  async function handleCancelOrder(currentOrder: Order) {
    await api.delete(`/orders/${currentOrder._id}`);

    toast.success(`O pedido da mesa ${currentOrder.table} foi cancelado!`);

    setOrders((prevState) => prevState.filter(order => order._id !== currentOrder._id));
  }

  async function handleChangeOrderStatus(currentOrder: Order) {
    const status = currentOrder.status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE';

    await api.patch(`/orders/${currentOrder._id}`, { status });

    toast.success(`O pedido da mesa ${currentOrder.table} teve o status alterado!`);

    setOrders((prevState) => prevState.map((order) => (
      order._id === currentOrder._id
        ? { ...order, status }
        : order
    )));
  }

  async function handleRestartDay() {
    await api.put('/orders/archive');

    toast.success('Todos os pedidos foram arquivados e estão na página Histórico');

    setOrders([]);
  }

  async function handleDeleteArchivedOrder(currentOrder: Order) {
    await api.delete(`/orders/${currentOrder._id}`);

    toast.success('Registro excluído com sucesso!');

    setArchivedOrders((prevState) => prevState.filter(order => order._id !== currentOrder._id));
  }

  return (
    <OrdersContext.Provider value={{
      orders,
      handleGetOrders,
      handleCancelOrder,
      handleChangeOrderStatus,
      handleRestartDay,
      archivedOrders,
      handleGetArchivedOrders,
      handleDeleteArchivedOrder
    }}>
      {children}
    </OrdersContext.Provider>
  );
}
