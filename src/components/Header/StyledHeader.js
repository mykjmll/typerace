import styled from 'styled-components';

const StyledHeader = styled.div`
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 3rem;

  span {
    font-size: ${props => props.theme.fontSize.lg};
    font-weight: bold;

    img {
      width: 60%;
      margin-left: 10px;
      :hover {
        cursor: pointer;
      }
    }
  }

  @media (${props => props.theme.mediaQuery.min.lg}) {
    
  }
`
export default StyledHeader
