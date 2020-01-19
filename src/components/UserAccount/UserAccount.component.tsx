import React, { Component } from 'react';
import '../../styles/css/user-account.styles.css';
import { LogIn } from '../LogIn/LogIn.component';

class UserAccount extends Component {
  render() {
    return (
      <div className="userAccountComponent">
        <LogIn></LogIn>
      </div>
    );
  }
}

export { UserAccount };
