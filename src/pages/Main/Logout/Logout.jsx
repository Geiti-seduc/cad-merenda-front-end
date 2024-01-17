/* eslint-disable */
import React, { useEffect } from 'react';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const loginRoute = '/';

  useEffect(() => {
    setTimeout(() => {
      signOut();
      localStorage.clear();
      navigate(loginRoute);
    }, 2000);
  }, []);

  return (
    <div className='h-screen flex items-center justify-center pb-20'>
      <p className="text-blue font-black text-center text-4xl mt-10">Até logo!</p>
    </div>
  );
}

export default Logout;
