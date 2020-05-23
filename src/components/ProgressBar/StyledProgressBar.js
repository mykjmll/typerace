import styled, { keyframes } from 'styled-components';

const progress = keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${props => props.value}%;
  }
`;
export const StyledProgressBar = styled.div`
  height: 10px;
`;

export const StyledProgress = styled.div`
  transition: 0.3s all linear;
  animation: ${progress} 1.5s ease-in-out forwards;
  -webkit-animation: ${progress} 1.5s ease-in-out forwards;
  width: ${props => props.value}%;
`;
