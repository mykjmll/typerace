import React from 'react';
import StyledHeader from './StyledHeader';
import logout from '../../assets/logout.png';
import { forwardTo } from '../../utils/commonHelper';

const Header = () => {
  const strkey = 'username';
  const user = localStorage.getItem(strkey);
  const onlogout = () => {
    localStorage.removeItem(strkey);
    forwardTo('/login');
  }
  return (
    <StyledHeader>
      <span>Welcome {user}!</span>
      <span><img src={logout} onClick={onlogout} alt="logout"/></span>
    </StyledHeader>
  );
}

export default Header