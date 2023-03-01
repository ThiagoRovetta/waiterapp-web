import { Container } from './styles';

interface TitleProps {
  title: string;
  quantity: number;
  label?: string;
  onClick?: () => void;
}

export function Title({ title, quantity, label, onClick }: TitleProps) {
  return (
    <Container>
      <div className="title-quantity">
        <h5>{title}</h5>
        <p>{quantity}</p>
      </div>
      {label && (
        <button type='button' onClick={onClick}>
          {label}
        </button>
      )}
    </Container>
  );
}
