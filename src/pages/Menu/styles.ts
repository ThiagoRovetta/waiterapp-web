import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavTab = styled.div`
  display: flex;

  border-bottom: 1px solid rgba(204, 204, 204, 0.4);

  .tab {
    padding: 16px 40px;

    border-radius: 8px 8px 0px 0px;

    cursor: pointer;

    font-weight: 400;
    font-size: 14px;

    color: #666666;

    &:hover {
      background: #FFFFFF;
      color: #D73035;
      font-weight: 600;
    }

    &.active {
      background: #FFFFFF;
      color: #D73035;
      font-weight: 600;
    }
  }
`;

export const NavContent = styled.div`
  margin-top: 32px;
`;
