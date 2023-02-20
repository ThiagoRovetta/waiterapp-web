import styled from 'styled-components';

export const Overlay = styled.div`
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
  background: #fff;
  width: 480px;
  border-radius: 8px;
  padding: 32px;

  display: flex;
  flex-direction: column;

  gap: 48px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      display: flex;
      gap: 20px;
    }

    svg {
      stroke: #666666;
    }

    strong {
      font-size: 24px;
    }

    button {
      line-height: 0;
      border: 0;
      background: transparent;

      &:disabled {
        cursor: not-allowed;
      }
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    gap: 16px;

    font-weight: 500;
    font-size: 16px;

    color: #333333;
  }
`;

export const Actions = styled.footer`
  display: flex;
  justify-content: space-between;

  button:disabled {
    cursor: not-allowed;
  }

  .primary {
    padding: 14px 28px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 8px;

    font-weight: 600;
    font-size: 16px;
    color: #fff;

    background: #D73035;

    border: 0;
    border-radius: 44px;

    &:disabled {
      background: rgba(215, 48, 53, 0.7);
    }
  }

  .secondary {
    padding: 14px 0;

    border: 0;
    background: transparent;

    font-weight: 600;
    font-size: 16px;
    color: #D73035;

    &:disabled {
      color: #CCCCCC;
    }
  }
`;
