import styled, { keyframes } from 'styled-components';

export const spinner = keyframes`
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

export const Container = styled.svg`
  -webkit-animation: ${spinner} 1.6s linear infinite both;
  animation: ${spinner} 1.6s linear infinite both;
`;
