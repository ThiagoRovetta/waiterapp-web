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

export const Form = styled.form`
  margin-top: 48px;

  display: flex;

  gap: 32px;

  .product {
    display: flex;
    flex-direction: column;

    width: 416px;

    gap: 32px;
  }

  .ingredients {
    display: flex;
    flex-direction: column;

    width: 416px;

    gap: 24px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 8px;

  padding: 0;

  &.selected {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  label {
    font-weight: 400;
    font-size: 14px;

    color: #333333;

    &.strong {
      font-weight: 600;
      font-size: 18px;

      color: #666666;
    }
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

export const InputImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  min-height: 160px;

  border: 1px solid #CCCCCC;
  border-radius: 8px;
  background: #FAFAFA;
`;

export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;

  img {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;

    width: 416px;
    height: 160px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  background: #FFFFFF;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  padding: 32px 0px;

  label {
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 16px !important;

    gap: 8px;

    cursor: pointer;
    color: #D73035 !important;
    stroke: #D73035;
  }

  input[type='file'] {
    display: none;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 16px;

  padding: 0;

  label {
    font-weight: 400;
    font-size: 14px;

    color: #666666;
  }

  &.selected {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;

  gap: 12px;

  max-width: 384px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;

    padding: 14px;

    background: #FFFFFF;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
    border-radius: 75px;
    border: 0px solid #FFFFFF;

    transition: all 0.5s;

    &.selectable {
      cursor: pointer;
    }

    button {
      font-weight: 600;
      font-size: 14px;

      color: #D73035;

      background: transparent;
      border: 0;
    }
  }

  input[type='radio'] {
    display: none;

    &:checked + label.selectable {
      border: 0.75px solid #D73035;
    }
  }
`;

export const IngredientsAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  button {
    border: 0;
    background: transparent;
    color: #D73035;
    font-weight: 600;
    font-size: 14px;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 100%;

  svg {
    position: absolute;
    bottom: 27%;
    right: 3%;
    cursor: pointer;

    color: #666666;
  }
`;

export const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 251px;

  padding: 0px;
  gap: 4px;

  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 16px;  /* Total width including border-width of scrollbar thumb */

    background: #FAFAFA;
    border: 1px solid #CCCCCC;
  }
  ::-webkit-scrollbar-thumb {
    border: 4px solid rgba(0, 0, 0, 0);  /* Transparent border together with background-clip: padding-box does the trick */
    background-clip: padding-box;
    border-radius: 8px;
    background-color: #CCCCCC;
  }
`;

export const Ingredient = styled.div`
  margin-bottom: 4px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  gap: 16px;

  padding: 16px;

  border: 1px solid rgba(204, 204, 204, 0.3);
  border-radius: 8px;

  p {
    display: inline-block;

    font-weight: 400;
    font-size: 14px;

    color: #666666;

    & + p {
      margin-left: 8px;
    }
  }

  input[type=checkbox] {
      visibility: hidden;
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
