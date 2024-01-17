/* eslint-disable */
import React, { useEffect } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const loginRoute = '/';

  useEffect(() => {
    localStorage.clear();
    signOut();
    navigate(loginRoute);
  }, []);

  return (
    <div />
  );
}

export default Logout;
