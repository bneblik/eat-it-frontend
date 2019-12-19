import React, { Component } from 'react';
import '../../styles/css/meal-info.styles.css';
import { TMealExtended } from '../Meal/Meal.component';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import image from '../../styles/images/placeholder.png';
import { NutrientsInfo } from '../NutrientsInfo/NutrientsInfo.component';
import { Rating } from '../Rating/Rating.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

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
        <div className="info">
          <Link
            to={{
              pathname: `/meals/${this.props.meal.id}`,
              state: { meal: this.props.meal }
            }}
            color="inherit"
          >
            <div className="name link">{this.props.meal.name} </div>
          </Link>
          <div>
            <Rating stars={5} readonly={true} />
            <span className="toRight">
              <FontAwesomeIcon icon={faClock} className="paddingIcon" />
              30 min
            </span>
          </div>
          <NutrientsInfo
            kcal={1} /*{this.props.meal.calories}*/
            carbs={1} /*{this.props.meal.carbs}*/
            proteins={1} /*{this.props.meal.protein}*/
            fats={1} /*{this.props.meal.fats}*/
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
