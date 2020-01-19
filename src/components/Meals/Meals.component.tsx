import React, { Component } from 'react';
import '../../styles/css/meals.styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/mealsAction';
import { TMeal } from '../../types/MealTypes';
import { MealInfo } from '../MealInfo/MealInfo.component';
import { i18n } from '../..';
import { MealsStateType } from '../../types/MealsTypes';

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
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
      return;
    console.log('Fetching more...');
  }

  showSkeletons() {
    const skeletons = [];
    for (let i = 0; i < 9; i++) {
      skeletons.push(<MealInfo key={i} meal={undefined}></MealInfo>);
    }
    return <div className="mealsComponent">{skeletons}</div>;
  }

  render() {
    if (this.props.error || this.props.meals === []) return <div>{i18n._('Nothing to display')}</div>;
    else if (this.props.pending) return this.showSkeletons();
    else {
      return (
        <div className="mealsComponent">
          {this.props.meals.map((meal) => (
            <MealInfo key={meal.id} meal={meal}></MealInfo>
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
