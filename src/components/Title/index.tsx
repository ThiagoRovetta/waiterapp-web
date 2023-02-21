import { Container } from './styles';

interface TitleProps {
  title: string;
  quantity: number;
}

export function Title({ title, quantity }: TitleProps) {
  return (
    <Container>
      <div className="title-quantity">
        <h5>{title}</h5>
        <p>{quantity}</p>
      </div>
    </Container>
  );
}
