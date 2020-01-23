import React, { Component } from 'react';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import '../../styles/css/header.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faUser,
  faPlus,
  faShoppingBasket,
  faSignOutAlt,
  faAdjust
} from '@fortawesome/free-solid-svg-icons';
import ChangeLang from '../ChangeLang/ChangeLang.component';
import { routes } from '../App/RouteConstants';
import { i18n } from '../..';
import { JWT_TOKEN } from '../../utils/RequestService';

type HeaderProps = {
  /**
   * contains address URL
   */
  history: any;
  /**
   * contains @param url with information about current language
   */
  match: any;
  /**
   * loges off the user
   */
  logout: () => void;
};
interface HeaderState {
  responsive: boolean;
}
/**
 * This component is the header of the application.
 * @author Beata Szczuka
 */
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
            <Tooltip title={i18n._('Add Meal')}>
              <IconButton href={`/${i18n.language}${routes.addMeal}`} className="itemIcon" color="inherit">
                <FontAwesomeIcon icon={faPlus} />
              </IconButton>
            </Tooltip>
          </span>
          <span className="menuItem">
            <Tooltip title={i18n._('Shopping list')}>
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
            <Tooltip title={i18n._('User panel')}>
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
          <span className="menuItem">
            <Tooltip title={i18n._('Change contrast')}>
              <IconButton onClick={this.changeContrast} className="itemIcon" color="inherit">
                <FontAwesomeIcon icon={faAdjust} />
              </IconButton>
            </Tooltip>
          </span>
          {this.handleLogInOut()}
        </div>
      </nav>
    );
  }

  changeContrast = () => {
    const wcag = 'wcag';
    if (!document.body.classList.contains(wcag)) {
      localStorage.setItem(wcag, 'true');
      document.body.classList.add(wcag);
    } else {
      localStorage.removeItem(wcag);
      document.body.classList.remove(wcag);
    }
  };

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
