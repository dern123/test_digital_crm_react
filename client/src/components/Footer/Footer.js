//react stateless component - rsc
import React, {useState} from 'react';

const Footer = ({name}) => {
  // console.log('Footer state - ',useState('gogi'));
  const [nameState, setNameState] = useState(name);
  // console.log('footer context',this);
  const handleClick = () => {
    const newName = prompt("new person name");
    setNameState(newName);
  };

  return (
    <footer>
      All rights are stolen by - <button onClick={handleClick}>{nameState}</button>
    </footer>
  );
};

export default Footer;