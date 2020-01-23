import React, { Component } from 'react';
import '../../styles/css/user-account.styles.css';
import LogIn from '../LogIn/LogIn.component';
import SignUp from '../SignUp/SignUp.component';

/**
 * This component renders forms for an unlogged user
 * @see LogIn
 * @see SignUp
 * @author Beata Szczuka
 */
class UserAccount extends Component {
  render() {
    return (
      <div className="userAccountComponent">
        <LogIn></LogIn>
        <SignUp></SignUp>
      </div>
    );
  }
}

export { UserAccount };
