import styled from 'styled-components';

export const Input = styled.input`
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
`;

const StyledRace = styled.div`
  .icon {
    display: inline-block;
    width: 0.7rem;
    margin-left: 3px;
  }
`;


export default StyledRace