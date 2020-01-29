import React, { Component } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faClipboardList,
  faCalendarDay,
  faBalanceScaleRight
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/css/add-to-meal-plan.styles.css';
import { i18n } from '../..';
import { addToMealPlan, clearMealPlanError, clearMealPlanSuccess } from '../../actions/mealPlanAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showAlert } from '../../helpers/Alert.component';
import { AddToMealPlanProps, AddToMealPlanState, initialStateAddToMealPlan } from './AddToMealPlan.types';
import { JWT_TOKEN } from '../../utils/RequestService';

/**
 * This component renders the form of adding a meal to the meal plan of the logged in user.
 * @author Beata Szczuka
 */
export class AddToMealPlan extends Component<AddToMealPlanProps> {
  state: AddToMealPlanState = initialStateAddToMealPlan;

  close() {
    this.setState({
      dialogOpened: false
    });
  }

  save() {
    const data = {
      name: this.props.mealName,
      portion: this.state.portion,
      date: this.state.date
    };
    this.props.addToMealPlan(data);
    this.close();
  }
  open() {
    this.setState({
      dialogOpened: true
    });
  }

  render() {
    const { pending, error, success, clearMealPlanError, clearMealPlanSuccess } = this.props;
    return (
      <>
        <span title={!localStorage.getItem(JWT_TOKEN) ? i18n._('You must be logged in') : ''}>
          <Button
            className="addButton"
            variant="contained"
            disabled={!localStorage.getItem(JWT_TOKEN)}
            onClick={this.open.bind(this)}
            startIcon={<FontAwesomeIcon icon={faClipboardList} />}
          >
            {i18n._('Add to your meal plan')}
          </Button>
        </span>
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
        {showAlert(pending, error, success, clearMealPlanError, clearMealPlanSuccess)}
      </>
    );
  }
}
const mapStateToProps = (state: AddToMealPlanState) => {
  return {
    error: state.mealPlanReducer.error,
    success: state.mealPlanReducer.success,
    pending: state.mealPlanReducer.pending
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      addToMealPlan,
      clearMealPlanError,
      clearMealPlanSuccess
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddToMealPlan);
