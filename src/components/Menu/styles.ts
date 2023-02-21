import styled from 'styled-components';

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 100vh;
  background: #FFFFFF;
  box-shadow: 10px 0px 32px rgba(204, 204, 204, 0.1);

  color: #666666;

  h5 {
    margin-top: 40px;

    font-weight: 300;
    font-size: 24px;
    text-transform: uppercase;

    b {
      font-weight: 700;
    }
  }
`;

export const GroupedItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  padding: 24px;
  gap: 8px;

  cursor: pointer;

  a {
    text-decoration: none;
    color: inherit;
  }

  p {
    font-weight: 500;
    font-size: 14px;
  }

  svg {
    stroke: #666666;
  }

  &.active {
    color: #D73035;

    svg {
      stroke: #D73035;
    }

    p {
      padding-bottom: 8px;
      position: relative;

      &::after {
        content: "";
        position: absolute;

        left: calc(50% - 6px);
        bottom: 0;

        height: 0px;
        width: 12px;
        border-bottom: 1.5px solid #D73035;
        border-radius: 1px;
      }
    }
  }

  &:hover {
    color: #D73035;

    svg {
      stroke: #D73035;
    }
  }
`;
