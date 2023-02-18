import styled from 'styled-components';

export const Container = styled.main`
  background: #FAFAFA;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  padding: 0;

  .welcome {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      font-weight: 500;
      font-size: 16px;
      opacity: 0.9;
    }

    h1 {
      margin-top: 4px;

      font-size: 32px;
      font-weight: 300;

      b {
        font-weight: 700;
      }

      text-transform: uppercase;
    }
  }

  form {
    margin-top: 40px;

    display: flex;
    flex-direction: column;
    gap: 32px;

    padding: 0;
  }
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

    padding: 0 16px;

    width: 384px;
    height: 56px;

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
`;

export const PasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    margin-left: -32px;
    cursor: pointer;

    color: #666666;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  color: #D73035;

  span {
    margin-left: 10.5px;
    font-weight: 400;
    font-size: 14px;
  }
`;

export const Button = styled.button`
  font-weight: 600;
  font-size: 16px;

  padding: 14px 28px;

  color: #FFFFFF;
  background: #D73035;

  border-radius: 44px;
  border: 0;

  transition: 0.5s;

  &:not(.active) {
    background: #CCCCCC;
    cursor: not-allowed;
  }
`;
