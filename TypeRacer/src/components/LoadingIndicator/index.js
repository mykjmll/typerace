import React from 'react';

import spinner from '../../assets/spinner.gif';
import Wrapper from './Wrapper';

const LoadingIndicator = props => {
  const { button, height } = props;
  return (
    <Wrapper button={button} height={height}>
      <img src={spinner} alt="loader" />
    </Wrapper>
  );
};

export default LoadingIndicator;
