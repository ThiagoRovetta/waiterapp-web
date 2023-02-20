import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 48px;
`;

export const Content = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .page-details {
    div {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      text-align: center;

      gap: 12px;

      margin-bottom: 21px;

      svg {
        width: 23px;
        height: 23px;

        stroke: #333333;
      }

      h1 {
        font-weight: 600;
        font-size: 24px;
        color: #333333;
      }
    }

    h2 {
      font-size: 16px;
      font-weight: 500;

      color: #666666;
      opacity: 0.9;
    }
  }

  button {
    padding: 18px 16px;
    background: transparent;
    border: 0;

    font-weight: 600;
    font-size: 16px;

    display: flex;
    align-items: center;

    gap: 12px;

    color: #D73035;
    stroke: #D73035;
  }
`;
