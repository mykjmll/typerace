import styled from 'styled-components';

export const StyledTimer = styled.div`
  text-align: right;
  .time {
    font-weight: bold;
    font-size: ${props => props.theme.fontSize.lg};
  }
` 
export default StyledTimer
