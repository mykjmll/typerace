import React from 'react';
import StyledInput from './StyledInput';

const Input = ({onChange, placeholder, type, name, className, ref}) => {
  return (
    <StyledInput type={type} onChange={onChange} placeholder={placeholder} name={name} className={className} ref={ref} />
  );
}

export default Input