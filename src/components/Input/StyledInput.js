import styled from 'styled-components';

const StyledInput = styled.input`
  display: inline-block;
  width: 100%;
  padding: 0.4rem;
  color: #000000;
  font-size: ${props => props.theme.fontSize.md};
  border: 1px solid #c2c1c1;
  background-color: #fffdf8;
  border-radius: 5px;
  margin-bottom: 1rem;

  &:focus {
    border: 1px solid #000000;
  }

  &:placeholder {
    color: #00000080;
  }

  :-internal-autofill-selected {
    background-color: #fffdf8 !important;
    background-image: none !important;
    color: rgb(0, 0, 0) !important;
  }
`
export default StyledInput
