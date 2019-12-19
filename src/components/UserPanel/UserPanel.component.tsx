import React, { Component } from 'react';
import {
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox
} from '@material-ui/core';
import '../../styles/css/user-panel.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faUnlock, faStopwatch, IconDefinition, faHeartbeat } from '@fortawesome/free-solid-svg-icons';

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
      <>
        <div>
          {this.renderSettingTitle('Set information about you', faHeartbeat)}
          <div className="panel aboutUser">
            <TextField
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              value={this.state.height}
              label="Height (in cm)"
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
              label="Weight (in kg)"
              type="number"
              onChange={(e) => {
                this.setState({ weight: e.target.value });
              }}
            />
          </div>
        </div>
        <hr />
        <div>
          {this.renderSettingTitle('Set reminders about meal time', faStopwatch)}
          <div className="panel formTime">
            <TextField
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
              value={this.state.newTime}
              label="Time"
              type="time"
              onChange={(e) => {
                this.setState({ newTime: e.target.value });
              }}
            />
            <FormControl>
              <div className="gray">Repeat:</div>
              <RadioGroup
                className="radiosInline"
                value={this.state.repeat}
                onChange={(e) => this.handleRepeat(e)}
              >
                <FormControlLabel value="daily" control={<Radio />} label="Daily" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
              {this.daysChooser()}
            </FormControl>
            <Button className="addReminderButton" variant="outlined" onClick={this.addTime}>
              Add
            </Button>
          </div>
          {this.displayTimes()}
        </div>
        <br />
        <div>
          {this.renderSettingTitle('Change password', faUnlock)}
          <div className="panel">
            <TextField
              variant="outlined"
              value={this.state.password}
              type="password"
              fullWidth={true}
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

export { UserPanel };
