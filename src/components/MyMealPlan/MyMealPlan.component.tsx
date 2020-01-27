import React, { Component } from 'react';
import '../../styles/css/my-meal-plan.styles.css';
import { Calendar } from '../Calendar/Calendar.component';
import { MealInfo } from '../MealInfo/MealInfo.component';
import { i18n } from '../..';
import { TMeal } from '../../types/MealTypes';
import { changeSelectedDate } from '../../actions/calendarAction';
import { DateState } from '../../types/Calendar';
import { connect } from 'react-redux';
import { formatRelative } from 'date-fns';
import { pl, enGB } from 'date-fns/locale';
import RecommendedMeals from '../RecommendedMeals/RecommendedMeals.component';
import { fetchMealPlan } from '../../actions/mealPlanAction';
import { MealPlanState } from '../../types/MealPlan';
import Statistics from '../Statistics/Statistics.component';

interface MyMealPlanState {
  calendarReducer: DateState;
  mealPlanReducer: MealPlanState;
  dateLocale: Locale;
}
interface MyMealPlanProps {
  /**
   * a date for which the meal plan is displayed
   */
  selectedDate: Date;
  /**
   * changes value of @param selectedDate
   */
  changeSelectedDate: typeof changeSelectedDate;
  /**
   * fetches meal plan and dispatches result
   */
  fetchMealPlan: typeof fetchMealPlan;
  /**
   * contains fetched meal plan of the logged in user
   */
  mealPlan: TMeal[];
}

/**
 * This component renders the meal plan of a logged in user
 * @see Calendar
 * @see RecommendedMeals
 * @author Beata Szczuka
 */
export class MyMealPlan extends Component<MyMealPlanProps, MyMealPlanState> {
  constructor(props: MyMealPlanProps) {
    super(props);
    this.state = {
      dateLocale: i18n.language === 'pl' ? pl : enGB,
      calendarReducer: {} as any,
      mealPlanReducer: {} as any
    };
  }
  componentDidMount() {
    this.props.fetchMealPlan();
  }
  renderMealsForTheDay() {
    if (this.props.mealPlan === []) return <div>Nothing to display</div>;
    const mealsInfo: any[] = [];
    this.props.mealPlan.forEach((meal, i) => mealsInfo.push(<MealInfo meal={meal} key={i}></MealInfo>));
    return <div>{mealsInfo}</div>;
  }

  componentDidUpdate() {
    if (i18n.language === 'pl' && this.state.dateLocale !== pl) {
      this.setState({ dateLocale: pl });
    } else if (i18n.language === 'en' && this.state.dateLocale !== enGB) {
      this.setState({ dateLocale: enGB });
    }
  }

  changeSelectedDate = (date: Date) => {
    this.props.changeSelectedDate(date);
  };

  cutTime(dateRelative: string) {
    let substr = ' at ';
    if (i18n.language === 'pl') substr = ' o ';
    const index = dateRelative.indexOf(substr);
    if (index === -1) return dateRelative;
    return dateRelative.substring(0, index);
  }

  render() {
    return (
      <>
        <div className="myMealPlanComponent">
          <span>
            <h2>
              {i18n._('My meal plan for ')}
              {this.cutTime(
                formatRelative(this.props.selectedDate, new Date(), {
                  locale: this.state.dateLocale
                })
              )}
            </h2>
            <span className="calendarButton">
              <Calendar
                selectedDate={this.props.selectedDate}
                changeSelectedDate={this.changeSelectedDate}
                dateLocale={this.state.dateLocale}
              ></Calendar>
            </span>
          </span>
          {this.renderMealsForTheDay()}
          <Statistics day={this.props.selectedDate} />
        </div>
        <RecommendedMeals />
      </>
    );
  }
}

const mapStateToProps = (state: MyMealPlanState) => ({
  selectedDate: state.calendarReducer.selectedDate,
  mealPlan: state.mealPlanReducer.mealPlan
});

export default connect(
  mapStateToProps,
  { changeSelectedDate, fetchMealPlan }
)(MyMealPlan);
