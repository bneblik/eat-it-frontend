import React, { Component } from 'react';
import '../../styles/css/most-popular-meals.styles.css';
import { MealInfo } from '../MealInfo/MealInfo.component';
import { TMeal } from '../../types/MealTypes';
import { MobileStepper, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { i18n } from '../..';
import { connect } from 'react-redux';
import { fetchRecommendedMeals, clearRecommendedMealsError } from '../../actions/recommendedMeals';
import { RecommendedMealsState } from '../../types/RecommendedMeals';
import { bindActionCreators } from 'redux';

interface RecommMealsComponentState {
  activeStep: number;
  maxSteps: number;
  recommendedMealsReducer: RecommendedMealsState;
}
interface RecommendedMealsProps {
  /**
   * fetches 5 best rated meals
   */
  fetchRecommendedMeals: typeof fetchRecommendedMeals;
  clearRecommendedMealsError: typeof clearRecommendedMealsError;
  /**
   * contains fetched meals
   */
  recommendedMeals: TMeal[];
  pending: boolean;
  error: any;
}

/**
 *  This component renders a carousel with best rated meals
 * @author Beata Szczuka
 */
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
    if (this.props.pending || this.props.recommendedMeals.length > 0)
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
    return <></>;
  }
}
const mapStateToProps = (state: RecommMealsComponentState) => ({
  recommendedMeals: state.recommendedMealsReducer.recommendedMeals,
  pending: state.recommendedMealsReducer.pending,
  error: state.recommendedMealsReducer.error
});
const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchRecommendedMeals,
      clearRecommendedMealsError
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecommendedMeals);
