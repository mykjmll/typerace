import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-block;
  font-weight: 300;
  width: 100%;
  padding: 0.5rem;
  background-color: #000000;
  color: #fff;
  box-shadow: none;
  border: 0;
  font-size: ${props => props.theme.fontSize.lg};
  border-radius: 0.3rem;
  margin-bottom: 1rem;

  &:hover {
    background-color: #00000080;
  }
`
export default StyledButton
