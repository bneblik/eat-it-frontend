import React, { Component } from 'react';
import {
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core';
import '../../styles/css/user-panel.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {
  faStopwatch,
  IconDefinition,
  faHeartbeat,
  faChevronDown,
  faBell
} from '@fortawesome/free-solid-svg-icons';
import { i18n } from '../..';
import { saveAboutUser, fetchAboutUser, setUserWeight, setUserHeight } from '../../actions/aboutUserAction';
import { connect } from 'react-redux';
import { AboutUserState } from '../../types/AboutUser';
import { ReminderType, ReminderState } from '../../types/Reminder';
import { fetchReminders, addReminder, removeReminder } from '../../actions/reminderAction';

interface UserPanelProps {
  username: string;
  height: string;
  weight: string;
  saveAboutUser: typeof saveAboutUser;
  fetchAboutUser: typeof fetchAboutUser;
  setUserHeight: typeof setUserHeight;
  setUserWeight: typeof setUserWeight;
  reminders: ReminderType[];
  fetchReminders: typeof fetchReminders;
  addReminder: typeof addReminder;
  removeReminder: typeof removeReminder;
}
interface UserPanelState {
  password: string;
  newTime: any;
  repeat: 'daily' | 'other';
  newRepeatDays: any[];
  aboutUserReducer: AboutUserState;
  reminderReducer: ReminderState;
}
class UserPanel extends Component<UserPanelProps> {
  days = [
    i18n._('mon'),
    i18n._('tue'),
    i18n._('wed'),
    i18n._('thu'),
    i18n._('fri'),
    i18n._('sat'),
    i18n._('sun')
  ];
  state: UserPanelState = {
    password: 'secretPassword',
    newTime: '',
    newRepeatDays: this.days,
    repeat: 'daily',
    aboutUserReducer: {} as any,
    reminderReducer: {} as any
  };

  componentDidMount() {
    this.props.fetchAboutUser();
    this.props.fetchReminders();
  }

  displayTimes = () => {
    const times: any = [];
    this.props.reminders.forEach((mealTime, j: number) =>
      times.push(
        <div key={j} className="reminder">
          <FontAwesomeIcon className="bell" icon={faBell} />
          <div className="reminderInfo">
            <div className="time">{mealTime.time}</div>
            <div className="repeat">{mealTime.repeat.join(', ')}</div>
          </div>
          <button className="trash" onClick={() => this.props.removeReminder(mealTime)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      )
    );
    return <div>{times}</div>;
  };

  addTime = () => {
    if (this.state.newTime) {
      this.props.addReminder({
        time: this.state.newTime,
        repeat: this.state.newRepeatDays
      });
      this.setState({
        newTime: '',
        newRepeatDays: this.days,
        repeat: 'daily'
      });
    }
  };

  handleAddDay = (e: any) => {
    const newVal = e.target.value;
    if (this.state.newRepeatDays.includes(newVal)) {
      this.setState((prev: UserPanelState) => ({
        newRepeatDays: prev.newRepeatDays.filter((day) => day !== newVal)
      }));
    } else {
      this.setState((prev: UserPanelState) => ({
        newRepeatDays: [...prev.newRepeatDays, newVal]
      }));
    }
  };

  daysChooser = () => {
    if (this.state.repeat === 'other')
      return (
        <FormControl>
          <div className="gray">{i18n._('Choose days')}</div>
          <FormGroup>{this.daysCheckboxes(this.days)}</FormGroup>
        </FormControl>
      );
  };

  daysCheckboxes(days: any[]) {
    const checkboxes: any[] = [];
    days.forEach((day) =>
      checkboxes.push(
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.newRepeatDays.includes(day)}
              onChange={(e) => this.handleAddDay(e)}
              value={day}
            />
          }
          label={day}
        />
      )
    );
    return <div>{checkboxes}</div>;
  }

  handleRepeat(e: any) {
    const repeatDays = e.target.value === 'daily' ? this.days : [];
    this.setState({ repeat: e.target.value, newRepeatDays: repeatDays });
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
                  value={this.props.height}
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
                  value={this.props.weight}
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
                onClick={() => this.props.saveAboutUser()}
              >
                {i18n._('Save')}
              </Button>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
            {this.renderSettingTitle(i18n._('Set reminders about meal time'), faStopwatch)}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div className="formTime">
              <TextField
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
                value={this.state.newTime}
                label={i18n._('Time')}
                type="time"
                onChange={(e) => {
                  this.setState({ newTime: e.target.value });
                }}
              />
              <FormControl>
                <div className="gray">{i18n._('Repeat')}:</div>
                <RadioGroup
                  className="radiosInline"
                  value={this.state.repeat}
                  onChange={(e) => this.handleRepeat(e)}
                >
                  <FormControlLabel value="daily" control={<Radio />} label={i18n._('Daily')} />
                  <FormControlLabel value="other" control={<Radio />} label={i18n._('Other')} />
                </RadioGroup>
                {this.daysChooser()}
              </FormControl>
              <Button className="addReminderButton" variant="outlined" onClick={this.addTime}>
                {i18n._('Add')}
              </Button>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {this.displayTimes()}
      </div>
    );
  }
}

const mapStateToProps = (state: UserPanelState) => {
  return {
    weight: state.aboutUserReducer.weight,
    height: state.aboutUserReducer.height,
    reminders: state.reminderReducer.reminders
  };
};

export default connect(
  mapStateToProps,
  { fetchAboutUser, saveAboutUser, setUserHeight, setUserWeight, fetchReminders, addReminder, removeReminder }
)(UserPanel);
