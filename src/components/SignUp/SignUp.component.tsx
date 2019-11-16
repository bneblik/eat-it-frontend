import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';

class SignUp extends Component {
  state = {
    username: '',
    password: '',
    repeatPass: '',
  };
  signUp() {}
  render() {
    return (
      <div className="signUpComponent panel">
        <h2 className="title">Don't have an account yet? Join us!</h2>
        <form>
          <div className="padding">
            <TextField
              label="Username"
              value={this.state.username}
              fullWidth={true}
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
            />
          </div>
          <div className="padding">
            <TextField
              label="Password"
              value={this.state.password}
              type="password"
              fullWidth={true}
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
            />
          </div>
          <div className="padding">
            <TextField
              label="Repeat password"
              value={this.state.repeatPass}
              type="password"
              fullWidth={true}
              onChange={e => {
                this.setState({ repeatPass: e.target.value });
              }}
            />
          </div>
          <div className="padding">
            <Button
              className="confirmButton"
              variant="contained"
              color="inherit"
              size="small"
              onClick={this.signUp}
            >
              Sign up
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export { SignUp };
