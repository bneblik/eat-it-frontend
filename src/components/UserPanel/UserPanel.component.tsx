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
import { i18n } from '@lingui/core';

interface UserPanelProps {
  username: string;
}
interface UserPanelState {
  password: string;
  mealTimes: any[];
  newTime: any;
  repeat: 'daily' | 'other';
  newRepeatDays: any[];
  height?: number;
  weight?: number;
}
class UserPanel extends Component<UserPanelProps> {
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  state: UserPanelState = {
    password: 'secretPassword',
    mealTimes: [],
    newTime: '',
    newRepeatDays: this.days,
    repeat: 'daily'
  };

  displayTimes = () => {
    const times: any = [];
    this.state.mealTimes.forEach((mealTime, j: number) =>
      times.push(
        <div key={j} className="reminder">
          <FontAwesomeIcon className="bell" icon={faBell} />
          <div className="reminderInfo">
            <div className="time">{mealTime.time}</div>
            <div className="repeat">{mealTime.repeat.join(', ')}</div>
          </div>
          <button className="trash">
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      )
    );
    return <div>{times}</div>;
  };

  addTime = () => {
    this.setState((e: UserPanelState) => ({
      mealTimes: [...e.mealTimes, { time: e.newTime, repeat: e.newRepeatDays }]
    }));
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
          <div className="gray">Choose days</div>
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
          <ExpansionPanelDetails className="aboutUser">
            <TextField
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              value={this.state.height}
              label={i18n._('Height (in cm)')}
              type="number"
              onChange={(e) => {
                this.setState({ height: e.target.value });
              }}
            />
            <TextField
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              value={this.state.weight}
              label={i18n._('Weight (in kg)')}
              type="number"
              onChange={(e) => {
                this.setState({ weight: e.target.value });
              }}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
            {this.renderSettingTitle(i18n._('Set reminders about meal time'), faStopwatch)}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {' '}
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

export { UserPanel };
