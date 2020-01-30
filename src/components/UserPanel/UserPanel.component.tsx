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
  clearAboutUserSuccess,
  setUserAge,
  setUserGender
} from '../../actions/aboutUserAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert } from '../../helpers/Alert.component';
import { UserPanelProps, UserPanelState } from './UserPanel.types';

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
    const {
      height,
      weight,
      gender,
      age,
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
              <div>
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
                <TextField
                  InputLabelProps={{
                    shrink: true
                  }}
                  select
                  SelectProps={{ native: true }}
                  variant="outlined"
                  value={gender}
                  label={i18n._('Gender')}
                  onChange={(e) => {
                    this.props.setUserGender(e.target.value);
                  }}
                >
                  {['', 'man', 'woman'].map((option, key) => (
                    <option key={key} value={option}>
                      {i18n._(option)}
                    </option>
                  ))}
                </TextField>
                <TextField
                  InputLabelProps={{
                    shrink: true
                  }}
                  variant="outlined"
                  value={age}
                  label={i18n._('Age')}
                  type="number"
                  onChange={(e) => {
                    this.props.setUserAge(e.target.value);
                  }}
                />
              </div>
              <Button
                className="addReminderButton"
                variant="outlined"
                onClick={() => this.props.saveAboutUser(height, weight, gender, age)}
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
    gender: state.aboutUserReducer.gender,
    age: state.aboutUserReducer.age,
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
      setUserAge,
      setUserGender,
      clearAboutUserError,
      clearAboutUserSuccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
