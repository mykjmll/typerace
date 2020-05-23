import React, {Children} from 'react';
import StyledLayout from './StyledLayout';
import Header from '../Header';

const Layout = ({children}) => {
  const user = localStorage.getItem('username');
  return (
    <StyledLayout>
      <div className="main-wrapper card text-center p-4">
        {user && <Header />}
        {Children.toArray(children)}
      </div>
    </StyledLayout>
  );
}

export default Layout