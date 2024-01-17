/* eslint-disable react/prop-types */
import React from 'react';
import Header from '../components/Header/header';

function BaseLayout({ children, thisUserType }) {
  return (
    <div>
      <Header userType={thisUserType} />
      {children}
    </div>
  );
}

export default BaseLayout;
