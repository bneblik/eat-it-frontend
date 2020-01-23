import React, { Component } from 'react';
import '../../styles/css/meal-info.styles.css';
import { Link } from 'react-router-dom';
import image from '../../styles/images/placeholder.png';
import { NutrientsInfo } from '../NutrientsInfo/NutrientsInfo.component';
import Rating from '@material-ui/lab/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Skeleton } from '@material-ui/lab';
import { TMeal } from '../../types/MealTypes';
import { i18n } from '../..';

interface MealInfoProps {
  /**
   * contains informations to display
   */
  meal: TMeal | undefined;
}

/**
 * This component renders short information about one meal
 * @author Beata Szczuka
 */
class MealInfo extends Component<MealInfoProps> {
  render() {
    return (
      <div className="mealInfoComponent">
        <div className="image">
          {!this.props.meal ? (
            <Skeleton variant="rect" width={'100%'} height={'330px'} />
          ) : (
            <img src={image} alt="Meal" />
          )}
        </div>
        <div className="info">
          <div className="top">
            {!this.props.meal ? (
              <Skeleton variant="rect" width={'30%'} height={'30px'} />
            ) : (
              <Link
                to={{
                  pathname: `/${i18n.language}/meals/${this.props.meal.id}`
                }}
                color="inherit"
              >
                <div className="name link">{this.props.meal.name}</div>
              </Link>
            )}
            {!this.props.meal ? (
              <div className="relative">
                <Skeleton variant="text" width={'50%'} />
                <Skeleton variant="text" width={'100px'} className="absoluteRight" />
              </div>
            ) : (
              <span className="toRight">
                <Rating
                  value={3}
                  precision={0.5}
                  onChange={(_, newValue) => {
                    console.log(newValue);
                  }}
                />
                <FontAwesomeIcon icon={faClock} className="paddingIcon" />
                <span id="prepTime">{this.props.meal.prepareTime}</span>
              </span>
            )}
          </div>
          {!this.props.meal ? (
            <Skeleton variant="text" width={'100%'} />
          ) : (
            <NutrientsInfo
              kcal={1} /*{this.props.meal.calories}*/
              carbs={1} /*{this.props.meal.carbs}*/
              proteins={1} /*{this.props.meal.protein}*/
              fats={1} /*{this.props.meal.fats}*/
            />
          )}
        </div>
      </div>
    );
  }
}

export { MealInfo };
