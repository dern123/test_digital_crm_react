import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './SideBar.scss';
import {connect} from 'react-redux';
import {emailsActions, emailsSelectors} from "../../redux/emails";
import {userSelectors} from "../../redux/user";

class SideBar extends Component {
  render() {
    const {items, isAuth, toggleEmailsModal} = this.props;
    const sideBarItems = items.map((singleItem, index) => (
      <li key={index} className="emails-sidebar__item">
        <NavLink activeClassName='emails-sidebar__item--active' to={`/${singleItem.toLowerCase()}`}>{singleItem.toUpperCase()}</NavLink>
        {/*<a href={"/" + singleItem.toLowerCase()}>{singleItem.toUpperCase()}</a>*/}
      </li>
    ));

    return (
      <aside className="emails-sidebar">
        {isAuth && <button onClick={() => toggleEmailsModal()} >New email</button>}
        <ul className="emails-sidebar__list">
          {sideBarItems}
        </ul>
      </aside>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  isAuth: userSelectors.isAuth(reduxState),
  isEmailModalOpen: emailsSelectors.isEmailModalOpen(reduxState)
});

const mapDispatchToProps = (dispatch, {isEmailModalOpen}) => ({
  toggleEmailsModal: () => dispatch(emailsActions.toggleEmailsModal(isEmailModalOpen))
});

// export default connect(mapStateToProps, mapDispatchToProps) (SideBar);
export default SideBar;