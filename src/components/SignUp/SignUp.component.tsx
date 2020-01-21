import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { UserType, CreateUserStateType } from '../../types/CreateUserTypes';
import { createUser, clearCreateUserError, clearCreateUserSuccess } from '../../actions/createUserAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { i18n } from '@lingui/core';
import { errorAlert, successAlert } from '../../helpers/Alert.component';

interface SignUpState {
  createUserReducer: CreateUserStateType;
  username: string;
  email: string;
  emailErrorText: string;
  password: string;
  paswdErrorText: string;
  repeatPass: string;
  repeatPaswdErrorText: string;
}
interface SignUpProps {
  error: any | null;
  success: any | null;
  user: UserType;
  pending: boolean;
  createUser: typeof createUser;
  clearCreateUserError: typeof clearCreateUserError;
  clearCreateUserSuccess: typeof clearCreateUserSuccess;
}
const initialState = {
  email: '',
  emailErrorText: '',
  username: '',
  password: '',
  paswdErrorText: '',
  repeatPass: '',
  repeatPaswdErrorText: '',
  createUserReducer: {} as any
};

class SignUp extends Component<SignUpProps, SignUpState> {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  signUp = () => {
    this.props.createUser({
      email: this.state.email,
      nick: this.state.username,
      password: this.state.password
    });
    this.setState(initialState);
  };
  render() {
    return (
      <div className="signUpComponent panel">
        <h2 className="title">{i18n._("Don't have an account yet? Join us!")}</h2>
        <form>
          <div className="padding">
            <TextField
              label={i18n._('Email')}
              className="emailField"
              required
              value={this.state.email}
              type="email"
              error={this.state.emailErrorText !== ''}
              helperText={this.state.emailErrorText}
              fullWidth={true}
              onChange={(e) => {
                this.handleEmailChange(e.target.value);
              }}
            />
          </div>
          <div className="padding">
            <TextField
              label={i18n._('Username')}
              className="usernameField"
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
              className="passwordField"
              value={this.state.password}
              error={this.state.paswdErrorText !== ''}
              helperText={this.state.paswdErrorText}
              required
              type="password"
              fullWidth={true}
              onChange={(e) => {
                this.handlePasswordChange(e.target.value);
              }}
            />
          </div>
          <div className="padding">
            <TextField
              label={i18n._('Repeat password')}
              className="repeatPswdField"
              value={this.state.repeatPass}
              type="password"
              required
              helperText={this.state.repeatPaswdErrorText}
              error={this.state.repeatPaswdErrorText.length > 0}
              fullWidth={true}
              onChange={(e) => {
                this.handleRepeatPaswdChange(e.target.value);
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
              disabled={this.isSubmitDisabled()}
            >
              {i18n._('Sign up')}
            </Button>
          </div>
        </form>
        {this.showAlert()}
      </div>
    );
  }

  showAlert() {
    if (!this.props.pending && !!this.props.error) {
      return errorAlert({
        isOpen: !!this.props.error,
        message: this.props.error,
        onClose: () => this.props.clearCreateUserError()
      });
    } else if (!this.props.pending && !!this.props.user) {
      return successAlert({
        isOpen: !!this.props.success,
        message: i18n._('User successfully created'),
        onClose: () => this.props.clearCreateUserSuccess()
      });
    }
  }

  handlePasswordChange(value) {
    let errorText = '';
    if (value.length === 0) {
      errorText = i18n._('this field cannot be empty');
    } else if (value.length < 6) {
      errorText = i18n._('password should have minimum 6 characters');
    }
    this.setState({ password: value, paswdErrorText: errorText });
  }
  handleRepeatPaswdChange(value) {
    let errorText = '';
    if (value.length === 0) {
      errorText = i18n._('this field cannot be empty');
    } else if (this.state.password !== value) {
      errorText = i18n._('passwords should match');
    }
    this.setState({ repeatPass: value, repeatPaswdErrorText: errorText });
  }
  handleEmailChange(value) {
    let errorText = '';
    const exp = /.+@.+\.[A-Za-z]+$/;
    if (value.length === 0) {
      errorText = i18n._('this field cannot be empty');
    } else if (!exp.test(value)) {
      errorText = i18n._('invalid email address');
    }
    this.setState({ email: value, emailErrorText: errorText });
  }
  isSubmitDisabled() {
    if (
      this.state.email.length === 0 ||
      this.state.emailErrorText.length !== 0 ||
      this.state.password.length === 0 ||
      this.state.paswdErrorText.length !== 0 ||
      this.state.repeatPass.length === 0 ||
      this.state.repeatPaswdErrorText.length !== 0
    ) {
      return true;
    }
    return false;
  }
}

const mapStateToProps = (state: SignUpState) => ({
  user: state.createUserReducer.user,
  pending: state.createUserReducer.pending,
  error: state.createUserReducer.error,
  success: state.createUserReducer.success
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      createUser,
      clearCreateUserError,
      clearCreateUserSuccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
