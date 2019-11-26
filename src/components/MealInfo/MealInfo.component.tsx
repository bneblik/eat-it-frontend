import React, { Component } from 'react';
import '../../styles/css/meal-info.styles.css';
import { TMealExtended } from '../Meal/Meal.component';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import image from '../../styles/images/placeholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

interface MealInfoProps {
  meal: TMealExtended;
}

class MealInfo extends Component<MealInfoProps> {
  renderNutrientsInfo() {
    return (
      <div className="nutrients">
        <span className="circle carbs">
          <FontAwesomeIcon icon={faCircle} title={`carbohydrates: ${this.props.meal.carbs}g`} size="1x" />
          {` carbs: ${this.props.meal.carbs}g`}
        </span>
        <span className="circle proteins">
          <FontAwesomeIcon icon={faCircle} title={`proteins: ${this.props.meal.protein}g`} size="1x" />
          {` proteins: ${this.props.meal.protein}g`}
        </span>
        <span className="circle fats">
          <FontAwesomeIcon icon={faCircle} title={`fats: ${this.props.meal.fats}g`} size="1x" />
          {` fats: ${this.props.meal.fats}g`}
        </span>
        <span className="circle calories">
          <FontAwesomeIcon icon={faCircle} title={`calories: ${this.props.meal.calories}`} size="1x" />
          {` calories: ${this.props.meal.calories}`}
        </span>
      </div>
    );
  }
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
          {this.renderNutrientsInfo()}

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
