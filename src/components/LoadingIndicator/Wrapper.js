import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  margin: 0 auto;
  // position: relative;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: ${x => x.height ? x.height : '100vh'};

  img {
    height: 60px;
    width: 60px;
  }

  ${props =>
    props.button &&
    css`
      height:  25px;
      margin: 0 auto;
      img {
        height: 20px;
        width: 20px;
      }
    `}
`;

export default Wrapper;
