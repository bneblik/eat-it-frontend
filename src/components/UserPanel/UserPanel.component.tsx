import React, { Component } from 'react';
import {
  TextField,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import '../../styles/css/user-panel.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faHeartbeat, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { i18n } from '../..';
import {
  saveAboutUser,
  fetchAboutUser,
  setUserWeight,
  setUserHeight,
  clearAboutUserError,
  clearAboutUserSuccess
} from '../../actions/aboutUserAction';
import { connect } from 'react-redux';
import { AboutUserState } from '../../types/AboutUser';
import { bindActionCreators } from 'redux';
import { showAlert } from '../../helpers/Alert.component';

interface UserPanelProps {
  height: string;
  weight: string;
  saveAboutUser: typeof saveAboutUser;
  fetchAboutUser: typeof fetchAboutUser;
  setUserHeight: typeof setUserHeight;
  setUserWeight: typeof setUserWeight;
  clearAboutUserError: typeof clearAboutUserError;
  clearAboutUserSuccess: typeof clearAboutUserSuccess;
  pending: boolean;
  error: any;
  success: any;
}
interface UserPanelState {
  aboutUserReducer: AboutUserState;
}

/**
 * This component contains a form to enter the user's height and weight,
 * used to generate statistics and a form to set notifications for the upcoming meal time
 * @see Statistics
 * @author Beata Szczuka
 */
class UserPanel extends Component<UserPanelProps> {
  state: UserPanelState = {
    aboutUserReducer: {} as any
  };

  componentDidMount() {
    this.props.fetchAboutUser();
  }

  renderSettingTitle(title: string, icon: IconDefinition) {
    return (
      <div className="setting">
        <FontAwesomeIcon icon={icon} className="icon" />
        <span>{title}</span>
      </div>
    );
  }

  render() {
    console.log(this.props);
    const {
      height,
      weight,
      pending,
      error,
      success,
      clearAboutUserError,
      clearAboutUserSuccess
    } = this.props;
    return (
      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
            {this.renderSettingTitle(i18n._('Set information about you'), faHeartbeat)}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="aboutUser">
              <span>
                <TextField
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  value={height}
                  label={i18n._('Height (in cm)')}
                  type="number"
                  onChange={(e) => {
                    this.props.setUserHeight(e.target.value);
                  }}
                />
                <TextField
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  value={weight}
                  label={i18n._('Weight (in kg)')}
                  type="number"
                  onChange={(e) => {
                    this.props.setUserWeight(e.target.value);
                  }}
                />
              </span>
              <Button
                className="addReminderButton"
                variant="outlined"
                onClick={() => this.props.saveAboutUser(height, weight)}
              >
                {i18n._('Save')}
              </Button>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {showAlert(pending, error, success, clearAboutUserError, clearAboutUserSuccess)}
      </div>
    );
  }
}

const mapStateToProps = (state: UserPanelState) => {
  return {
    weight: state.aboutUserReducer.weight,
    height: state.aboutUserReducer.height,
    success: state.aboutUserReducer.success,
    error: state.aboutUserReducer.error,
    pending: state.aboutUserReducer.pending
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchAboutUser,
      saveAboutUser,
      setUserHeight,
      setUserWeight,
      clearAboutUserError,
      clearAboutUserSuccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
