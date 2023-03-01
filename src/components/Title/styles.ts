import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title-quantity {
    display: flex;
    align-items: center;

    gap: 8px;

    h5 {
      font-weight: 600;
      font-size: 18px;

      color: #333333;
    }

    p {
      padding: 4px 8px;

      background: rgba(204, 204, 204, 0.2);
      border-radius: 4px;

      color: #333333;
    }
  }

  button {
    border: 0;
    background: transparent;

    font-weight: 600;
    font-size: 14px;

    color: #D73035;
  }
`;
