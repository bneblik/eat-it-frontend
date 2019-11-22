import React, { Component } from 'react';
import { Card, CardHeader, CardContent, Typography, CardActionArea } from '@material-ui/core';
import '../../styles/css/meals.styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMeals } from '../../actions/mealsAction';
import { Link } from 'react-router-dom';
import { TMeal } from '../../types/MealTypes';
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
  }

  render() {
    if (this.props.error || this.props.meals === []) return <div>Nothing to display</div>;
    else
      return (
        <div className="mealsComponent">
          <h1>Meals:</h1>
          <div>
            {this.props.meals.map((meal) => (
              <Card key={meal.id} className="card">
                <CardActionArea>
                  <Link
                    to={{
                      pathname: `/meals/${meal.id}`,
                      state: { meal: meal }
                    }}
                    color="inherit"
                  >
                    <CardHeader title={meal.name} />
                  </Link>
                </CardActionArea>

                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {meal.recipe}
                  </Typography>
                </CardContent>
              </Card>
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
