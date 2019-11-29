import React, { Component } from 'react';
import '../../styles/css/meals.styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/mealsAction';
import { TMeal } from '../../types/MealTypes';
import { MealsStateType } from '../../types/MealsTypes';
import { MealInfo } from '../MealInfo/MealInfo.component';
import { TMealExtended } from '../Meal/Meal.component';

interface MealsProps {
  error: any | null;
  meals: TMeal[];
  pending: boolean;
  fetchMeals: typeof fetchMeals;
}
type MealsState = { mealsReducer: MealsStateType };

class Meals extends Component<MealsProps, MealsState> {
  componentDidMount() {
    const { fetchMeals } = this.props;
    fetchMeals();
  }

  render() {
    if (this.props.error || this.props.meals === []) return <div>Nothing to display</div>;
    else
      return (
        <div className="mealsComponent">
          <h1>Meals:</h1>
          <div>
            {this.props.meals.map((meal) => (
              <MealInfo key={meal.id} meal={meal as TMealExtended}></MealInfo>
            ))}
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state: MealsState) => {
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
)(Meals);
