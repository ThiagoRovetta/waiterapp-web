import { Container } from './styles';
import { OrdersBoard } from '../OrdersBoard';
import { Order } from '../../types/Order';

const orders: Order[] = [
  {
    '_id': '6375a0148a4782072c73b2aa',
    'table': '123',
    'status': 'WAITING',
    'products': [
      {
        'product': {
          'name': 'Pizza quatro queijos',
          'imagePath': '1668651428573-quatro-queijos.png',
          'price': 40,
        },
        'quantity': 3,
        '_id': '6375a0148a4782072c73b2ab'
      },
      {
        'product': {
          'name': 'Coca cola',
          'imagePath': '1668652550502-coca-cola.png',
          'price': 7,
        },
        'quantity': 2,
        '_id': '6375a0148a4782072c73b2ac'
      }
    ],
  }
];

export function Orders() {
  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={orders}
      />

      <OrdersBoard
        icon="🧑‍🍳"
        title="Em preparação"
        orders={[]}
      />

      <OrdersBoard
        icon="✅"
        title="Pronto!"
        orders={[]}
      />

      {/* <OrdersBoard
        icon="🔴"
        title="Cancelados"
      /> */}
    </Container>
  );
}
