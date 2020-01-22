import React, { Component } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBell as faBellRegular } from '@fortawesome/free-regular-svg-icons';
import {
  faUtensils,
  faClipboardList,
  faCalendarDay,
  faBell as faBellSolid,
  faBalanceScaleRight
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/css/add-to-meal-plan.styles.css';
import { i18n } from '../..';
import { format } from 'date-fns';

type AddToMealPlanProps = {
  mealName: string;
};
type AddToMealPlanState = {
  portion: string;
  date: string;
  time: string;
  reminder: boolean;
  dialogOpened: boolean;
  portionOptions: string[];
};

const initialState: AddToMealPlanState = {
  portion: '1',
  date: format(new Date(), 'yyyy-MM-dd'),
  time: '12:00',
  reminder: false,
  dialogOpened: false,
  portionOptions: ['0.5', '1', '2']
};

class AddToMealPlan extends Component<AddToMealPlanProps> {
  state: AddToMealPlanState = initialState;

  close() {
    this.setState({
      dialogOpened: false
    });
  }

  save() {
    const data = {
      id: 1,
      name: this.props.mealName,
      portion: this.state.portion,
      date: +this.state.date,
      time: +this.state.time,
      reminder: +this.state.reminder
    };
    // this.props.addToMealPlan(data);
    this.close();
  }
  open() {
    this.setState({
      dialogOpened: true
    });
  }

  render() {
    return (
      <>
        <Button
          className="addButton"
          variant="contained"
          onClick={this.open.bind(this)}
          startIcon={<FontAwesomeIcon icon={faClipboardList} />}
        >
          {i18n._('Add to your meal plan')}
        </Button>
        <Dialog open={this.state.dialogOpened} className="addToMealPlanComponent">
          <DialogTitle>{i18n._('Add to your meal plan')}</DialogTitle>
          <DialogContent>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faUtensils} />
              <TextField
                label={i18n._('Meal name')}
                variant="outlined"
                disabled={true}
                value={this.props.mealName}
              />
            </div>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faBalanceScaleRight} />
              <TextField
                label={i18n._('Portion')}
                variant="outlined"
                select
                SelectProps={{ native: true }}
                value={this.state.portion}
                onChange={(e) => {
                  this.setState({ portion: e.target.value });
                }}
              >
                {this.state.portionOptions.map((option, key) => (
                  <option key={key} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </div>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faCalendarDay} />
              <TextField
                label={i18n._('Date')}
                variant="outlined"
                type="date"
                value={this.state.date}
                onChange={(e) => {
                  this.setState({ date: e.target.value });
                }}
              />
            </div>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faClock} />
              <TextField
                label={i18n._('Time')}
                variant="outlined"
                type="time"
                value={this.state.time}
                onChange={(e) => {
                  this.setState({ time: e.target.value });
                }}
              />
            </div>
            <div className="inputContainer">
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FontAwesomeIcon icon={faBellRegular} />}
                    checkedIcon={<FontAwesomeIcon icon={faBellSolid} />}
                    value={this.state.reminder}
                    onChange={() =>
                      this.setState((prev: AddToMealPlanState) => ({ reminder: !prev.reminder }))
                    }
                  />
                }
                label={i18n._('Set reminder')}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.close.bind(this)} color="primary">
              {i18n._('Cancel')}
            </Button>
            <Button onClick={this.save.bind(this)} color="primary">
              {i18n._('Add')}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export { AddToMealPlan };
