import React, { Component } from 'react';
import { Button, IconButton } from '@material-ui/core';
import '../../styles/css/header.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSignInAlt, faPlus, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import ChangeLang from './ChangeLang';
import { routes } from '../App/RouteConstants';
import { i18n } from '../..';

type HeaderProps = {
  history: any;
  match: any;
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
          <IconButton
            href={`/${i18n.language}${routes.addMeal}`}
            className="menuItem itemIcon"
            color="inherit"
          >
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
          <IconButton
            href={`/${i18n.language}${routes.shoppingList}`}
            className="menuItem itemIcon"
            color="inherit"
          >
            <FontAwesomeIcon icon={faShoppingBasket} />
          </IconButton>
          <IconButton
            href={`/${i18n.language}${routes.userPanel}`}
            className="menuItem itemIcon"
            color="inherit"
          >
            <FontAwesomeIcon icon={faUser} />
          </IconButton>
          <span className="menuItem itemIcon">
            <ChangeLang history={this.props.history} match={this.props.match} />
          </span>
          <IconButton href={`/${i18n.language}${routes.login}`} className="menuItem itemIcon" color="inherit">
            <FontAwesomeIcon icon={faSignInAlt} />
          </IconButton>
        </div>
      </nav>
    );
  }
}

export default Header;
