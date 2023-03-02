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
  border-radius: 8px;
  padding: 32px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 24px;
    }

    button {
      line-height: 0;
      border: 0;
      background: transparent;
    }
  }
`;

export const Body = styled.div`
  margin-top: 48px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 24px;

  min-width: 416px;

  p {
    font-weight: 500;
    font-size: 16px;

    color: #666666;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 14px;

  background: #FFFFFF;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  border-radius: 75px;
`;

export const Actions = styled.footer`
  margin-top: 48px;

  display: flex;
  justify-content: space-between;

  button {
    &.primary {
      padding: 14px 56px;

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

    &.secondary {
      padding: 14px 0;

      border: 0;
      background: transparent;

      font-weight: 600;
      font-size: 16px;
      color: #D73035;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;
