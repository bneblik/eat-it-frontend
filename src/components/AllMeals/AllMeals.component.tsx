import React, { Component } from 'react';
import '../../styles/css/all-meals.styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/mealsAction';
import { TMeal } from '../../types/MealTypes';
import { MyMealsStateType } from '../../types/MealsTypes';
import image from '../../styles/images/background-image.jpg';
import { TextField, FormControlLabel, Switch } from '@material-ui/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyMealsComponent from '../MyMeals/MyMeals.component';
import { i18n } from '../..';

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
    const options = ['all categories', 'breakfast', 'dinner'];
    return (
      <TextField
        className="selectCategory"
        variant="outlined"
        select
        value={'all categories'}
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
                startAdornment: <FontAwesomeIcon icon={faSearch} className="padding" />
              }}
              placeholder={i18n._('Search for a meal...')}
            />
            <div className="searchFilters">
              {this.selectCategory()}
              <FormControlLabel
                control={<Switch checked={true} onChange={() => {}} />}
                label={i18n._('only my meals')}
              />
            </div>
          </div>
        </div>
        <MyMealsComponent />
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
