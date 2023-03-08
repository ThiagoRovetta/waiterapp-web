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

  width: 480px;

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

export const Form = styled.form`
  margin-top: 48px;

  display: flex;
  flex-direction: column;

  gap: 32px;

  width: 408px;
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

export const PasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  position: relative;

  input {
  }

  svg {
    position: absolute;
    bottom: 27%;
    right: 3%;

    cursor: pointer;

    color: #666666;
    stroke: #666666;
  }
`;

export const RadioContainer = styled.div`
  display: flex;

  gap: 32px;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;

  gap: 12px;

  input {
    accent-color: #D73035;

    &:checked + label {
      color: #D73035;
    }
  }
`;

export const Actions = styled.footer`
  margin-top: 48px;

  display: flex;
  justify-content: space-between;

  &.add-mode {
    justify-content: flex-end;
  }

  button {
    &.primary {
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
        background: #CCCCCC;
      }
    }

    &.secondary {
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

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
