import React, { Component } from 'react';
import '../../styles/css/meal-info.styles.css';
import { TMealExtended } from '../Meal/Meal.component';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import image from '../../styles/images/placeholder.png';
import { NutrientsInfo } from '../NutrientsInfo/NutrientsInfo.component';

interface MealInfoProps {
  meal: TMealExtended;
}

class MealInfo extends Component<MealInfoProps> {
  render() {
    return (
      <div key={this.props.meal.id} className="mealInfoComponent">
        <div className="image">
          <img src={image} alt="Meal" />
        </div>
        <div>
          <Link
            to={{
              pathname: `/meals/${this.props.meal.id}`,
              state: { meal: this.props.meal }
            }}
            color="inherit"
          >
            <div className="name link">{this.props.meal.name} </div>
          </Link>
          <NutrientsInfo
            kcal={this.props.meal.calories}
            carbs={this.props.meal.carbs}
            proteins={this.props.meal.protein}
            fats={this.props.meal.fats}
          />

          <div>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.meal.recipe}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}

export { MealInfo };
