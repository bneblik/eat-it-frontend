import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';

class Header extends Component {
    render() {
        return (
            <nav className='headerComponent sticky'>
                <Toolbar>
                    <Typography variant="h6" >
                        <a href='/'>
                            <div className="logo">Eat it!</div>
                        </a>
                    </Typography>
                    <div className="toRight">
                    <Button href='/meals' className='menuItem' color='inherit'>Meals</Button>
                    <Button href='/add-meal' className='menuItem' color='inherit'>Add meal</Button>

                    </div>
                </Toolbar>
            </nav>
        );
    }
}

export { Header };
