import React, { Component } from 'react';
import '../../styles/css/most-popular-meals.styles.css';
import { MealInfo } from '../MealInfo/MealInfo.component';
import { TMeal } from '../../types/MealTypes';
import { MobileStepper, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { i18n } from '../..';
import { connect } from 'react-redux';
import { fetchRecommendedMeals } from '../../actions/recommendedMeals';
import { RecommendedMealsState } from '../../types/RecommendedMeals';

interface RecommMealsComponentState {
  activeStep: number;
  maxSteps: number;
  recommendedMealsReducer: RecommendedMealsState;
}
interface RecommendedMealsProps {
  recommendedMeals: TMeal[];
  fetchRecommendedMeals: typeof fetchRecommendedMeals;
}
class RecommendedMeals extends Component<RecommendedMealsProps, RecommMealsComponentState> {
  state: RecommMealsComponentState = {
    activeStep: 1,
    maxSteps: 4,
    recommendedMealsReducer: {} as any
  };

  componentDidMount() {
    this.props.fetchRecommendedMeals();
  }

  handleNext = () => {
    this.setState((prevState: RecommMealsComponentState) => ({ activeStep: prevState.activeStep + 1 }));
  };

  handleBack = () => {
    this.setState((prevState: RecommMealsComponentState) => ({ activeStep: prevState.activeStep - 1 }));
  };

  carousel = () => {
    const firstMeal = this.state.activeStep === 0 ? 4 : this.state.activeStep - 1;
    const lastMeal = this.state.activeStep === 4 ? 0 : this.state.activeStep + 1;
    return (
      <>
        <MealInfo meal={this.props.recommendedMeals[firstMeal]} key={1} />
        <MealInfo meal={this.props.recommendedMeals[this.state.activeStep]} key={2} />
        <MealInfo meal={this.props.recommendedMeals[lastMeal]} key={3} />
      </>
    );
  };

  render() {
    return (
      <div className="recommendedMealsComponent">
        <h3>{i18n._('Recommended by users')}</h3>
        <div className="carousel">{this.carousel()}</div>
        <MobileStepper
          steps={5}
          position="static"
          activeStep={this.state.activeStep}
          nextButton={
            <IconButton size="small" onClick={this.handleNext} disabled={this.state.activeStep === 5 - 1}>
              <FontAwesomeIcon icon={faChevronRight} />
            </IconButton>
          }
          backButton={
            <IconButton size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </IconButton>
          }
        />
      </div>
    );
  }
}
const mapStateToProps = (state: RecommMealsComponentState) => ({
  recommendedMeals: state.recommendedMealsReducer.recommendedMeals
});

export default connect(
  mapStateToProps,
  { fetchRecommendedMeals }
)(RecommendedMeals);
