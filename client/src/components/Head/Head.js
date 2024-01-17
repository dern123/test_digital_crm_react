import React, {Component} from 'react';
import NavList from "./NavList/NavList";
import NavButton from "../NavButton/NavButton";
import {Link, withRouter} from "react-router-dom";
import Icons from "../../theme/icons/Icons";
import './Header.scss'

class Head extends Component {
  state = {
    links: [],
    iconColor: 'red'
  };

  componentDidMount() {
    this.setState({links: ['home', 'portfolio', 'contacts', 'gallery']})
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    const {links} = this.state;
    return (
      <header className="container header-wrapper">
        <img src="https://picsum.photos/200/300" alt="logo" className='header__company-logo'/>

        <Link to={'/register'}>go register</Link>

        <Icons type='human' color={this.state.iconColor} onClick={() => this.setState({iconColor: 'olive'})} classes="header-logo"/>

        <NavList items={links}/>

        <button onClick={() => this.goBack()}>go back</button>

        <NavButton/>
      </header>
    );
  }
}

export default withRouter(Head);
// export default Head;