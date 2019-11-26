import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import '../../styles/css/header.styles.css';

class Header extends Component {
  render() {
    return (
      <nav className="headerComponent sticky">
        <Toolbar>
          <Typography variant="h6">
            <a href="/">
              <div className="logo">Eat it!</div>
            </a>
          </Typography>
          <div className="toRight">
            <Button href="/meals" className="menuItem" color="inherit">
              Meals
            </Button>
            <Button href="/add-meal" className="menuItem" color="inherit">
              Add meal
            </Button>
            <Button href="/login" className="menuItem" color="inherit">
              LogIn
            </Button>
            <Button href="/my-fridge" className="menuItem" color="inherit">
              My fridge
            </Button>
            <Button href="/my-meal-plan" className="menuItem" color="inherit">
              My meal plan
            </Button>
          </div>
        </Toolbar>
      </nav>
    );
  }
}

export { Header };
