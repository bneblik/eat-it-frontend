import React, { Component } from 'react';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import '../../styles/css/header.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faPlus, faShoppingBasket, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import ChangeLang from './ChangeLang';
import { routes } from '../App/RouteConstants';
import { i18n } from '../..';
import { JWT_TOKEN } from '../../utils/RequestService';

type HeaderProps = {
  history: any;
  match: any;
  logout: () => void;
};
interface HeaderState {
  responsive: boolean;
}
class Header extends Component<HeaderProps> {
  state: HeaderState = {
    responsive: false
  };
  toggleMenu = () => {
    this.setState((prevState: HeaderState) => ({
      responsive: !prevState.responsive
    }));
  };
  render() {
    return (
      <nav className="headerComponent sticky ">
        <div className="flex">
          <div className="logo">Eat it!</div>
          <Button className="toRight icon" onClick={() => this.toggleMenu()}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
        <div className={this.state.responsive ? 'responsive' : 'toRight'} id="menu">
          <Button href={`/${i18n.language}${routes.meals}`} className="menuItem" color="inherit">
            {i18n._('Meals')}
          </Button>
          <Button href={`/${i18n.language}${routes.myFridge}`} className="menuItem" color="inherit">
            {i18n._('My fridge')}
          </Button>
          <Button href={`/${i18n.language}${routes.myMealPlan}`} className="menuItem" color="inherit">
            {i18n._('My meal plan')}
          </Button>
          <span className="menuItem">
            <Tooltip title={i18n._('Change lang')}>
              <IconButton href={`/${i18n.language}${routes.addMeal}`} className="itemIcon" color="inherit">
                <FontAwesomeIcon icon={faPlus} />
              </IconButton>
            </Tooltip>
          </span>
          <span className="menuItem">
            <Tooltip title={i18n._('Change lang')}>
              <IconButton
                href={`/${i18n.language}${routes.shoppingList}`}
                className="itemIcon"
                color="inherit"
              >
                <FontAwesomeIcon icon={faShoppingBasket} />
              </IconButton>
            </Tooltip>
          </span>
          <span className="menuItem">
            <Tooltip title={i18n._('Change lang')}>
              <IconButton href={`/${i18n.language}${routes.userPanel}`} className="itemIcon" color="inherit">
                <FontAwesomeIcon icon={faUser} />
              </IconButton>
            </Tooltip>
          </span>
          <span className="menuItem">
            <Tooltip title={i18n._('Change lang')}>
              <span className="itemIcon">
                <ChangeLang history={this.props.history} match={this.props.match} />
              </span>
            </Tooltip>
          </span>
          {this.handleLogInOut()}
        </div>
      </nav>
    );
  }

  handleLogInOut() {
    if (localStorage.getItem(JWT_TOKEN)) {
      return (
        <span className="menuItem">
          <Tooltip title="Log out">
            <IconButton id="logOut" onClick={() => this.props.logout()} className="itemIcon" color="inherit">
              <FontAwesomeIcon icon={faSignOutAlt} />
            </IconButton>
          </Tooltip>
        </span>
      );
    } else {
      return (
        <Button id="logIn" href={`/${i18n.language}${routes.login}`} className="menuItem" color="inherit">
          {i18n._('Log in')}
        </Button>
      );
    }
  }
}

export default Header;
