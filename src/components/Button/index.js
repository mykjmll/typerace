import React, {Children} from 'react';
import StyledButton from './StyledButton';

const Button = ({type, onClick, className, children}) => {
  return (
    <StyledButton type={type} onClick={onClick} className={className}>
      {Children.toArray(children)}
    </StyledButton>
  );
}

export default Button