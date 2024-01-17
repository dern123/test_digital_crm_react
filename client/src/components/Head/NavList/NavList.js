import React, {Component} from 'react';
import NavLink from "../../NavLink/NavLink";

class NavList extends Component {
  render() {
    const{items} = this.props;
    const itemsArray = items.map((item,index)=>{
      return <li key={index} className="header__nav-item">
        <NavLink text={item}/>
      </li>
    });
    return (
      <ul className="header__nav-list">
        {itemsArray}
      </ul>
    );
  }
}

export default NavList;