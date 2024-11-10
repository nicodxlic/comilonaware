import React from 'react';
import { useNavigate } from 'react-router-dom';
import comilonawarelogo from '../../comilonawarelogo.png';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-primary flex justify-center items-center py-4">
      <img
        src={comilonawarelogo}
        alt="Comilonaware Logo"
        className="h-16 cursor-pointer"
        onClick={() => navigate('/')}
      />
    </header>
  );
}

export default Header;