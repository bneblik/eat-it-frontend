import React, { Component } from 'react';
import '../../styles/css/most-popular-meals.styles.css';
import { MealInfo } from '../MealInfo/MealInfo.component';
import { MobileStepper, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { i18n } from '../..';
import { connect } from 'react-redux';
import { fetchRecommendedMeals, clearRecommendedMealsError } from '../../actions/recommendedMeals';
import { bindActionCreators } from 'redux';
import { RecommendedMealsProps, RecommMealsComponentState } from './RecommendedMeals.types';

/**
 *  This component renders a carousel with best rated meals
 * @author Beata Szczuka
 */
class RecommendedMeals extends Component<RecommendedMealsProps, RecommMealsComponentState> {
  state: RecommMealsComponentState = {
    activeStep: 1,
    maxSteps: 5,
    diff: 0,
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

  showElement(meal, key) {
    if (meal >= 0 && meal < this.state.maxSteps) {
      return <MealInfo meal={this.props.recommendedMeals[meal]} key={key} />;
    } else return <div className="mealInfoComponent"></div>;
  }

  carousel = () => {
    const firstMeal = this.state.activeStep - 1;
    const lastMeal = this.state.activeStep + 1;
    return (
      <>
        {this.showElement(firstMeal, 1)}
        <MealInfo meal={this.props.recommendedMeals[this.state.activeStep]} key={2} />
        {this.showElement(lastMeal, 3)}
      </>
    );
  };

  render() {
    const { diff } = this.state;
    if (this.props.pending || this.props.recommendedMeals.length > 0)
      return (
        <div
          className="recommendedMealsComponent"
          ref={(el) => {
            if (!el) return;
            const width = el.getBoundingClientRect().width;
            if (width > 360 && diff === 0) this.setState({ diff: 1 });
          }}
        >
          <h3>{i18n._('Recommended by users')}</h3>
          <div className="carousel">{this.carousel()}</div>
          <MobileStepper
            steps={this.state.maxSteps}
            position="static"
            activeStep={this.state.activeStep}
            nextButton={
              <IconButton
                size="small"
                onClick={this.handleNext}
                disabled={this.state.activeStep === this.state.maxSteps - 1 - diff}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </IconButton>
            }
            backButton={
              <IconButton
                size="small"
                onClick={this.handleBack}
                disabled={this.state.activeStep === 0 + diff}
              >
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
