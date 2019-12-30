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
import { Skeleton } from '@material-ui/lab';

interface MealInfoProps {
  meal: TMealExtended;
}

class MealInfo extends Component<MealInfoProps> {
  loading = false;
  render() {
    return (
      <div key={this.props.meal.id} className="mealInfoComponent">
        <div className="image">
          {this.loading ? (
            <Skeleton variant="rect" width={'100%'} height={'330px'} />
          ) : (
            <img src={image} alt="Meal" />
          )}
        </div>
        <div className="info">
          {this.loading ? (
            <Skeleton variant="rect" width={'30%'} height={'30px'} />
          ) : (
            <Link
              to={{
                pathname: `/meals/${this.props.meal.id}`,
                state: { meal: this.props.meal }
              }}
              color="inherit"
            >
              <div className="name link">{this.props.meal.name} </div>
            </Link>
          )}
          {this.loading ? (
            <div className="relative">
              <Skeleton variant="text" width={'50%'} />
              <Skeleton variant="text" width={'100px'} className="absoluteRight" />
            </div>
          ) : (
            <div>
              <span className="toRight">
                <Rating stars={5} readonly={true} />
                <FontAwesomeIcon icon={faClock} className="paddingIcon" />
                30 min
              </span>
            </div>
          )}
          {this.loading ? (
            <Skeleton variant="text" width={'100%'} />
          ) : (
            <NutrientsInfo
              kcal={1} /*{this.props.meal.calories}*/
              carbs={1} /*{this.props.meal.carbs}*/
              proteins={1} /*{this.props.meal.protein}*/
              fats={1} /*{this.props.meal.fats}*/
            />
          )}

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
