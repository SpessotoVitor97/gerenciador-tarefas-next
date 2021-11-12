import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

import { Login } from '../containers/Login';
import { Home } from '../containers/Home';
import { Register } from '../containers/Register'

const Index: NextPage = () => {
  const [accessToken, setToken] = useState('');
  const [register, setRegister] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setToken(token);
      }
    }
  }, []);

  return (accessToken ? <Home setToken={setToken}/> : !register ?  <Login setToken={setToken} setRegister={setRegister}/> : <Register setRegister={setRegister}/>)
}

export default Index