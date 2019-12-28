import React, { Component } from 'react';
import '../../styles/css/all-meals.styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/mealsAction';
import { TMeal } from '../../types/MealTypes';
import { MyMealsStateType } from '../../types/MealsTypes';
import { MealInfo } from '../MealInfo/MealInfo.component';
import { TMealExtended } from '../Meal/Meal.component';
import image from '../../styles/images/background-image.jpg';
import { TextField, FormControlLabel, Switch } from '@material-ui/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface AllMealsProps {
  error: any | null;
  meals: TMeal[];
  pending: boolean;
  fetchMeals: typeof fetchMeals;
}
type AllMealsState = { mealsReducer: MyMealsStateType };

class AllMeals extends Component<AllMealsProps, AllMealsState> {
  componentDidMount() {
    const { fetchMeals } = this.props;
    fetchMeals();
  }
  selectCategory() {
    const options = ['all', 'breakfast', 'dinner'];
    return (
      <TextField
        className="selectCategory"
        variant="filled"
        select
        value={'all'}
        onChange={() => {}}
        SelectProps={{ native: true }}
      >
        {options.map((option, key) => (
          <option key={key} value={option} className="categoryOption">
            {option}
          </option>
        ))}
      </TextField>
    );
  }

  render() {
    return (
      <div className="allMealsComponent">
        <div className="searchPanel">
          <img src={image} alt="Meal" />
          <div className="searchField">
            <TextField
              className="searcher"
              variant="outlined"
              InputProps={{
                startAdornment: <FontAwesomeIcon icon={faSearch} />
              }}
              placeholder="Search for a meal..."
            />
            <div className="searchFilters">
              <FormControlLabel
                control={<Switch checked={true} onChange={() => {}} />}
                label="Only my meals"
              />
              {this.selectCategory()}
            </div>
          </div>
        </div>
        <div className="mealsComponent">
          {this.props.meals.map((meal) => (
            <MealInfo key={meal.id} meal={meal as TMealExtended}></MealInfo>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AllMealsState) => {
  return {
    error: state.mealsReducer.error,
    meals: state.mealsReducer.meals,
    pending: state.mealsReducer.pending
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchMeals: fetchMeals
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllMeals);
