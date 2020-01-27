import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { i18n } from '@lingui/core';
import { bindActionCreators } from 'redux';
import { AuthStateType } from '../../types/AuthTypes';
import { logIn } from '../../actions/authAction';
import { connect } from 'react-redux';
import { History, LocationState } from 'history';

interface LogInState {
  authReducer: AuthStateType;
  email: string;
  password: string;
}
interface LogInProps {
  /**
   * contains an error message or is null
   */
  error: any | null;
  /**
   * contains a success message
   */
  success: any | null;
  /**
   * determines whether adding is pending
   */
  pending: boolean;
  /**
   * login user with given @param userData
   */
  logIn: typeof logIn;
  /**
   * if contains @param from user will be redirected there after logging in
   */
  location: any;
  /**
   * contains address URL
   */
  history: History<LocationState>;
}

/**
 * This component is a login form
 * @author Beata Szczuka
 */
class LogIn extends Component<LogInProps, LogInState> {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authReducer: {} as any
    };
  }
  logIn = () => {
    this.props.logIn({ email: this.state.email, password: this.state.password });
    this.setState({ email: '', password: '' });
  };
  componentDidUpdate() {
    if (!this.props.pending && !!this.props.success && !!this.props.location.state) {
      this.props.history.push({ pathname: this.props.location.state.from.pathname });
    }
  }

  render() {
    return (
      <div className="panel">
        <h2 className="title">{i18n._('Log in')}</h2>
        <form>
          <div className="padding">
            <TextField
              label={i18n._('Email')}
              className="emailField"
              variant="filled"
              value={this.state.email}
              fullWidth={true}
              onChange={(e) => {
                this.setState({ email: e.target.value });
              }}
            />
          </div>
          <div className="padding">
            <TextField
              label={i18n._('Password')}
              className="passwordField"
              value={this.state.password}
              variant="filled"
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

const mapStateToProps = (state: LogInState) => ({
  pending: state.authReducer.pending,
  error: state.authReducer.error,
  success: state.authReducer.success
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      logIn: logIn
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
