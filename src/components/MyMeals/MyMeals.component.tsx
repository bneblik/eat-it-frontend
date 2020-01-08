import React, { Component } from 'react';
import '../../styles/css/meals.styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/mealsAction';
import { TMeal } from '../../types/MealTypes';
import { MyMealsStateType } from '../../types/MealsTypes';
import { MealInfo } from '../MealInfo/MealInfo.component';
import { TMealExtended } from '../Meal/Meal.component';
import { i18n } from '../..';

interface MyMealsProps {
  error: any | null;
  meals: TMeal[];
  pending: boolean;
  fetchMeals: typeof fetchMeals;
}
type MyMealsState = { mealsReducer: MyMealsStateType };

class MyMeals extends Component<MyMealsProps, MyMealsState> {
  componentDidMount() {
    const { fetchMeals } = this.props;
    fetchMeals();
  }

  render() {
    if (this.props.error || this.props.meals === []) return <div>{i18n._('Nothing to display')}</div>;
    else
      return (
        <div className="mealsComponent">
          {this.props.meals.map((meal) => (
            <MealInfo key={meal.id} meal={meal as TMealExtended}></MealInfo>
          ))}
        </div>
      );
  }
}

const mapStateToProps = (state: MyMealsState) => {
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
)(MyMeals);
