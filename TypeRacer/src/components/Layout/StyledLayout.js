import styled from 'styled-components';

const StyledLayout = styled.div`
  padding: 20px 25px;
  display:flex; 
  flex-direction:column; 
  min-height: 100vh;

  .main-wrapper {
    width: 100%;
    margin: 0 auto;
    
  }

  @media (${props => props.theme.mediaQuery.min.lg}) {
    padding : 40px 95px;

    .main-wrapper {
      width: 50%;
      margin: 0 auto;
    }
  }
`
export default StyledLayout