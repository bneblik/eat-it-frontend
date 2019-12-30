import React, { Component } from 'react';
import { Button, IconButton } from '@material-ui/core';
import '../../styles/css/header.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSignInAlt, faPlus, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

interface HeaderState {
  responsive: boolean;
}
class Header extends Component {
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
          <Button href="/meals" className="menuItem" color="inherit">
            Meals
          </Button>
          <Button href="/my-fridge" className="menuItem" color="inherit">
            My fridge
          </Button>
          <Button href="/my-meal-plan" className="menuItem" color="inherit">
            My meal plan
          </Button>
          <IconButton href="/add-meal" className="menuItem itemIcon" color="inherit">
            <FontAwesomeIcon icon={faPlus} />
          </IconButton>
          <IconButton href="/shopping-list" className="menuItem itemIcon" color="inherit">
            <FontAwesomeIcon icon={faShoppingBasket} />
          </IconButton>
          <IconButton href="/user-panel" className="menuItem itemIcon" color="inherit">
            <FontAwesomeIcon icon={faUser} />
          </IconButton>
          <IconButton href="/login" className="menuItem itemIcon" color="inherit">
            <FontAwesomeIcon icon={faSignInAlt} />
          </IconButton>
        </div>
      </nav>
    );
  }
}

export { Header };
