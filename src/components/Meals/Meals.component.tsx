import React, { Component } from 'react';
import '../../styles/css/meals.styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/mealsAction';
import { MealInfo } from '../MealInfo/MealInfo.component';
import { i18n } from '../..';
import { MealsProps, MealsState } from './Meals.types';

/**
 * This component renders short information for each meal of @param meals
 * @see MealInfo
 * @author Beata Szczuka
 */
class Meals extends Component<MealsProps, MealsState> {
  showSkeletons() {
    const skeletons = [];
    for (let i = 0; i < 9; i++) {
      skeletons.push(<MealInfo key={i} meal={undefined}></MealInfo>);
    }
    return <div className="mealsComponent">{skeletons}</div>;
  }

  render() {
    if (this.props.pending) return this.showSkeletons();
    else if (this.props.error || this.props.meals.length === 0)
      return <div className="notFound">{i18n._("Sorry, we couldn't find anything.")}</div>;
    else {
      return (
        <div className="mealsComponent">
          {this.props.meals.map((meal, i) => (
            <MealInfo key={i} meal={meal}></MealInfo>
          ))}
        </div>
      );
    }
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
