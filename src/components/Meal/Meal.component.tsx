import React, { Component } from 'react';
import '../../styles/css/meal.styles.css';
import image from '../../styles/images/carbonara.jpg';
import { MealComments } from '../MealComments/MealComments.component';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { NutrientsInfo } from '../NutrientsInfo/NutrientsInfo.component';
import { faShoppingBasket, faPlus, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddToMealPlan } from '../AddToMealPlan/AddToMealPlan.component';
import { i18n } from '@lingui/core';
import { fetchMeal } from '../../actions/mealAction';
import { bindActionCreators } from 'redux';
import { MealStateType, TMeal } from '../../types/MealTypes';
import { connect } from 'react-redux';
import { Skeleton } from '@material-ui/lab';

interface MealProps {
  match: {
    params: { id: string };
  };
  fetchMeal: typeof fetchMeal;
  error: any | null;
  meal: TMeal | undefined;
  pending: boolean;
}
interface MealState {
  mealReducer: MealStateType;
}

class Meal extends Component<MealProps, MealState> {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchMeal(this.props.match.params.id);
  }

  renderAboutInfo() {
    return (
      <div className="about">
        {this.props.pending ? <Skeleton component="h1" /> : <h1>{this.props.meal.name}</h1>}
        <p className="prepInfo">
          {this.props.pending ? (
            <Skeleton component="span" width="50%" />
          ) : (
            <>
              <span>
                <FontAwesomeIcon icon={faClock} />
                Prepare time: {this.props.meal.prepareTime}
              </span>
              <span className="divider"> | </span>
              <span className="divider"> | </span>
              <span>
                <FontAwesomeIcon icon={faFilter} />
                Category: {this.props.meal.category}
              </span>
            </>
          )}
        </p>
        {this.props.pending ? (
          <Skeleton component="span" width="50%" />
        ) : (
          <NutrientsInfo
            carbs={this.props.meal.carbs}
            proteins={this.props.meal.proteins}
            fats={this.props.meal.fats}
            kcal={this.props.meal.calories}
          />
        )}
        {this.props.pending ? (
          <Skeleton width="20px" height="10px" />
        ) : (
          <AddToMealPlan mealName={this.props.meal.name} />
        )}
      </div>
    );
  }

  renderYoutubeVideo() {
    return (
      <div className="card">
        <h3>{i18n._('Watch this recipe on YouTube')}</h3>
        <div className="youtubeVideo">
          {this.props.pending ? (
            <Skeleton variant="rect" component="iframe" />
          ) : (
            <iframe
              title="recipe"
              src="https://www.youtube.com/embed/3AAdKl1UYZs"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    );
  }
  render() {
    if (!this.props.pending && !this.props.meal) {
      return (
        <div>
          {i18n._('Cannot find element with id')} = {this.props.match.params.id}
        </div>
      );
    } else {
      return (
        <div className="mealComponent">
          <div className="top">
            {this.props.pending ? (
              <Skeleton className="image" component="div" variant="rect" height="150px" />
            ) : (
              <div className="image">
                <img src={image} alt="Meal" />
              </div>
            )}

            {this.renderAboutInfo()}
          </div>
          <div className="ingredients card">
            <div className="header">
              <h3>{i18n._('Ingredients')}</h3>
            </div>
            {/* {this.props.pending ? (
              <>
                <Skeleton height="50px" />
                <Skeleton height="50px" />
                <Skeleton height="50px" />
              </>
            ) : (
              this.props.meal.ingredients.map((ingredient, key) => (
                <ProductInfo key={key} product={ingredient} />
              ))
            )} */}
            <div className="shoppingListGroup">
              <FormControlLabel
                className="shoppingListButton"
                control={
                  <Checkbox
                    icon={<FontAwesomeIcon icon={faShoppingBasket} />}
                    checkedIcon={<FontAwesomeIcon className="basket" icon={faShoppingBasket} />}
                    value="checkedH"
                  />
                }
                label={i18n._('Select all')}
              />
              <Button
                className="shoppingListButton"
                variant="outlined"
                startIcon={<FontAwesomeIcon icon={faPlus} />}
              >
                {i18n._('Add selected to your shopping list')}
              </Button>
            </div>
          </div>
          <div className="card">
            <h3>Recipe</h3>
            {this.props.pending ? (
              <Skeleton height="80px" />
            ) : (
              this.props.meal.recipe.forEach((line, key) => <p key={key}>{line}</p>)
            )}
          </div>
          {this.renderYoutubeVideo()}
          <MealComments></MealComments>
        </div>
      );
    }
  }
}

const mapStateToProps = (state: MealState) => {
  return {
    error: state.mealReducer.error,
    meal: state.mealReducer.meal,
    pending: state.mealReducer.pending
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchMeal: fetchMeal
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Meal);
