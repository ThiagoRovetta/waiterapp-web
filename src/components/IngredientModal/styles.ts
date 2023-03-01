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
  display: flex;
  flex-direction: column;
  gap: 48px;

  padding: 32px;

  background: #FFFFFF;
  border-radius: 8px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 16px;
    padding: 0;

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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;

  padding: 0px;

  width: 408px;
  height: 202px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 8px;

  padding: 0;

  label {
    font-weight: 400;
    font-size: 14px;

    color: #333333;
  }

  input {
    border: 1px solid #CCCCCC;
    border-radius: 8px;

    padding: 17.5px 16px;

    width: 100%;

    color: #666666;
    caret-color: #D73035;

    outline: none;

    transition: 0.5s;

    &::placeholder {
      font-weight: 400;
      font-size: 14px;

      color: #999999;

      padding: 16px 0;
    }

    &:focus {
      border: 1px solid #666666;
    }

    &.error {
      border: 1px solid #D73035;
    }
  }

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;

    color: #666666;
  }
`;

export const Actions = styled.footer`
  display: flex;
  justify-content: flex-end;

  button {
    padding: 14px 28px;

    font-weight: 600;
    font-size: 16px;
    color: #fff;

    background: #D73035;

    border: 0;
    border-radius: 44px;

    &:disabled {
      background: #CCCCCC;
      cursor: not-allowed;
    }
  }
`;
