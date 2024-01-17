/* eslint-disable react/prop-types */
import React from 'react';
import Header from '../header/header';

function Layout({ children, thisUserType }) {
  return (
    <div>
      <Header userType={ thisUserType } />
      {children}
    </div>
  );
}

export default Layout;
