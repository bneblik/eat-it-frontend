import React, { Component } from 'react';
import '../../styles/css/user-account.styles.css';
import LogIn from '../LogIn/LogIn.component';
import SignUp from '../SignUp/SignUp.component';
import { Alert } from '@material-ui/lab';

interface UserAccountProps {
  location: any;
  history: any;
}

/**
 * This component renders forms for an unlogged user
 * @see LogIn
 * @see SignUp
 * @author Beata Szczuka
 */
class UserAccount extends Component<UserAccountProps> {
  renderInfoAboutRedirect() {
    if (!!this.props.location.state) {
      return <Alert severity="info">You must be logged in to proceed</Alert>;
    }
  }
  render() {
    return (
      <div className="userAccountComponent">
        {this.renderInfoAboutRedirect()}
        <div className="forms">
          <LogIn {...this.props}></LogIn>
          <SignUp></SignUp>
        </div>
      </div>
    );
  }
}

export { UserAccount };
