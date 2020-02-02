import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { i18n } from '@lingui/core';
import { bindActionCreators } from 'redux';
import { logIn } from '../../actions/authAction';
import { connect } from 'react-redux';
import { LogInProps, LogInState } from './LogIn.types';
import { JWT_TOKEN } from '../../utils/RequestService';
import { routes } from '../App/RouteConstants';

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
    if (!this.props.pending && !!this.props.success) {
      if (!!this.props.location.state)
        this.props.history.push({ pathname: this.props.location.state.from.pathname });
      else this.props.history.push({ pathname: routes.meals });
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
              disabled={
                !!localStorage.getItem(JWT_TOKEN) || this.state.password === '' || this.state.email === ''
              }
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
