import React, { useContext } from 'react';
import { ModalContext } from '../Store/Context';


function Header() {

  const { isOpen, modalTrigger ,setAuth } = useContext(ModalContext);
  console.log(isOpen);

  const handleLogin = () => {
    modalTrigger();
    setAuth('login');
  }

  const handleRegister = () => { 
    modalTrigger();
    setAuth('register');
  }
  return (
    <div className='bg-amber-400 text-white p-4 flex justify-between items-center shadow-md'>
      <div>
        <h1 className='text-3xl font-extrabold tracking-wide'>BlogMania</h1>
      </div>
      <div className='flex space-x-4'>
        <button className='px-4 py-2 bg-white text-amber-500 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition'
        onClick={handleLogin}>
          Login
        </button>
        <button className='px-4 py-2 bg-white text-amber-500 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition'
        onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Header;
