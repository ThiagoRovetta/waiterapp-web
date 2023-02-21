import styled from 'styled-components';

export const Container = styled.table`
  margin-top: 16px;

  width: 100%;
  overflow: hidden;

  border-spacing: 0;
  border-collapse: separate;
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 8px;

  thead {
    background: rgba(204, 204, 204, 0.2);
    padding: 0 16px;

    text-align: left;
  }

  tbody {
    background: #FFFFFF;
  }

  th, td {
    border-bottom: 1px solid rgba(204, 204, 204, 0.4);
  }

  tr:last-child {
    td {
      border: 0;
    }
  }

  th {
    font-weight: 600;
    font-size: 14px;

    color: #333333;

    padding: 13.5px 16px;

    &.filter {
      button {
        display: flex;
        align-items: center;

        gap: 8px;

        border: 0;
        background: transparent;

        font-weight: 600;
        font-size: 14px;

        color: #333333;
      }
    }
  }

  td {
    padding: 16px;

    font-weight: 400;
    font-size: 14px;

    color: #333333;

    .actions {
      display: flex;
      align-items: center;

      gap: 16px;

      stroke: #666666;

      button {
        border: 0;
        background: transparent;
      }
    }
  }
`;
