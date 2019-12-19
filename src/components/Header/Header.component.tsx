import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import '../../styles/css/header.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

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
      <nav className="headerComponent sticky">
        <div className="flex">
          <a href="/">
            <div className="logo">Eat it!</div>
          </a>
          <Button className="toRight icon" onClick={() => this.toggleMenu()}>
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </div>
        <div className={this.state.responsive ? 'responsive' : 'toRight'} id="menu">
          <Button href="/meals" className="menuItem" color="inherit">
            Meals
          </Button>
          <Button href="/add-meal" className="menuItem" color="inherit">
            Add meal
          </Button>
          <Button href="/my-fridge" className="menuItem" color="inherit">
            My fridge
          </Button>
          <Button href="/my-meal-plan" className="menuItem" color="inherit">
            My meal plan
          </Button>
          <Button href="/user-panel" className="menuItem itemIcon" color="inherit">
            <FontAwesomeIcon icon={faUser} />
          </Button>
          <Button href="/login" className="menuItem itemIcon" color="inherit">
            <FontAwesomeIcon icon={faSignInAlt} />
          </Button>
        </div>
      </nav>
    );
  }
}

export { Header };
