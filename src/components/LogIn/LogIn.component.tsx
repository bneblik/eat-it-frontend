import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { i18n } from '@lingui/core';

class LogIn extends Component {
  state = {
    username: '',
    password: ''
  };
  logIn() {}
  render() {
    return (
      <div className="panel">
        <h2 className="title">{i18n._('Log in')}</h2>
        <form>
          <div className="padding">
            <TextField
              label={i18n._('Username')}
              value={this.state.username}
              fullWidth={true}
              onChange={(e) => {
                this.setState({ username: e.target.value });
              }}
            />
          </div>
          <div className="padding">
            <TextField
              label={i18n._('Password')}
              value={this.state.password}
              type="password"
              fullWidth={true}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            />
          </div>
          <div className="padding">
            <Button
              className="confirmButton"
              variant="contained"
              color="inherit"
              size="small"
              onClick={this.logIn}
            >
              {i18n._('Log in')}
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export { LogIn };
