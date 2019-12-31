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
  faBell as faBellSolid
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/css/add-to-meal-plan.styles.css';

type AddToMealPlanState = {
  name: string;
  calories: string;
  carbs: string;
  fats: string;
  protein: string;
  dialogOpened: boolean;
};

class AddToMealPlan extends Component {
  state: AddToMealPlanState = {
    name: '',
    calories: '',
    carbs: '',
    fats: '',
    protein: '',
    dialogOpened: false
  };

  toggleDialog() {
    this.setState((prevState: AddToMealPlanState) => ({
      dialogOpened: !prevState.dialogOpened
    }));
  }

  render() {
    return (
      <>
        <Button
          className="addButton"
          variant="contained"
          onClick={this.toggleDialog.bind(this)}
          startIcon={<FontAwesomeIcon icon={faClipboardList} />}
        >
          Add to your meal plan
        </Button>
        <Dialog open={this.state.dialogOpened} className="addToMealPlanComponent">
          <DialogTitle>Add to your meal plan</DialogTitle>
          <DialogContent>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faUtensils} />
              <TextField
                label="Meal name"
                variant="outlined"
                value={this.state.name}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </div>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faCalendarDay} />
              <TextField
                label="Date"
                variant="outlined"
                value={this.state.name}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </div>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faClock} />
              <TextField
                label="Time"
                variant="outlined"
                value={this.state.name}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </div>
            <div className="inputContainer">
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FontAwesomeIcon icon={faBellRegular} />}
                    checkedIcon={<FontAwesomeIcon icon={faBellSolid} />}
                    value={true}
                  />
                }
                label="Set reminder"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleDialog.bind(this)} color="primary">
              Cancel
            </Button>
            <Button onClick={this.toggleDialog.bind(this)} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export { AddToMealPlan };
