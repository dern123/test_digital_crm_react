import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.scss';

const Head = () => {
  const [links, setLinks] = useState([]);
  const [iconColor, setIconColor] = useState('red');
  const navigate = useNavigate();

  useEffect(() => {
    setLinks(['home', 'portfolio', 'contacts', 'gallery']);
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className="container header-wrapper">
      

      <Link to={'/dashboard'}>Go dashboard</Link>

      {/* Uncomment and modify the following lines if you have an Icons component */}
      {/* <Icons type='human' color={iconColor} onClick={() => setIconColor('olive')} classes="header-logo"/> */}

      {/* Uncomment and modify the following line if you have a NavList component */}
      {/* <NavList items={links}/> */}

      <button onClick={goBack}>go back</button>

      {/* Uncomment the following line if you have a NavButton component */}
      {/* <NavButton/> */}
    </header>
  );
};

export default Head;
