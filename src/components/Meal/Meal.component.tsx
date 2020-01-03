import React, { Component } from 'react';
import '../../styles/css/meal.styles.css';
import image from '../../styles/images/carbonara.jpg';
import { MealComments } from '../MealComments/MealComments.component';
import { ProductInfo } from '../ProductInfo/ProductInfo.component';
import { Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { NutrientsInfo } from '../NutrientsInfo/NutrientsInfo.component';
import { faShoppingBasket, faPlus, faBalanceScaleRight, faFilter } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddToMealPlan } from '../AddToMealPlan/AddToMealPlan.component';

interface MealProps {
  match: {
    params: { id: string };
  };
}
interface MealState {
  meal: TMealExtended;
}

export type TMealExtended = {
  id: number;
  name: string;
  recipe: string;
  createdAt?: Date;
  ingredients: string[]; //it will be whole objects list
  calories?: number;
  fats?: number;
  protein?: number;
  carbs?: number;
  prepareTime?: string;
  servings?: number;
  category?: string;
};

const meal: TMealExtended = {
  id: 1,
  name: 'Spaghetti carbonara',
  recipe:
    "Heat pasta water: Put a large pot of salted water on to boil (1 Tbsp salt for every 2 quarts of water.)\nSauté pancetta/bacon and garlic: While the water is coming to a boil, heat the olive oil in a large sauté pan over medium heat. Add the bacon or pancetta and cook slowly until crispy. Add the garlic (if using) and cook another minute, then turn off the heat and put the pancetta and garlic into a large bowl.\nBeat eggs and half of the cheese: In a small bowl, beat the eggs and mix in about half of the cheese.\nCook pasta: Once the water has reached a rolling boil, add the dry pasta, and cook, uncovered, at a rolling boil.\nToss pasta with pancetta/bacon: When the pasta is al dente (still a little firm, not mushy), use tongs to move it to the bowl with the bacon and garlic. Let it be dripping wet. Reserve some of the pasta water. Move the pasta from the pot to the bowl quickly, as you want the pasta to be hot. It's the heat of the pasta that will heat the eggs sufficiently to create a creamy sauce.\nToss everything to combine, allowing the pasta to cool just enough so that it doesn't make the eggs curdle when you mix them in. (That's the tricky part.)\n6 Add the beaten egg mixture: Add the beaten eggs with cheese and toss quickly to combine once more. Add salt to taste. Add some pasta water back to the pasta to keep it from drying out.",
  createdAt: new Date(),
  ingredients: ['butter', 'bacon', 'garlic', 'eggs', 'parmesan', 'spaghetti pasta', 'salt', 'pepper'],
  calories: 200,
  fats: 9,
  protein: 16.5,
  carbs: 16,
  prepareTime: '30 min',
  servings: 1,
  category: 'dinner'
};

class Meal extends Component<MealProps, MealState> {
  constructor(props: Readonly<MealProps>) {
    super(props);
    this.state = {
      meal: meal
    };
  }

  renderAboutInfo() {
    return (
      <div className="about">
        <h1>{this.state.meal.name}</h1>
        <p className="prepInfo">
          <span>
            <FontAwesomeIcon icon={faClock} />
            Prepare time: {this.state.meal.prepareTime}
          </span>
          <span className="divider"> | </span>
          <span>
            <FontAwesomeIcon icon={faBalanceScaleRight} />
            Servings: {this.state.meal.servings}
          </span>
          <span className="divider"> | </span>
          <span>
            <FontAwesomeIcon icon={faFilter} />
            Category: {this.state.meal.category}
          </span>
        </p>
        <NutrientsInfo
          carbs={this.state.meal.carbs}
          proteins={this.state.meal.protein}
          fats={this.state.meal.fats}
          kcal={this.state.meal.calories}
        />
        <AddToMealPlan />
      </div>
    );
  }

  renderYoutubeVideo() {
    return (
      <div className="card">
        <h3>Watch this recipe on YouTube</h3>
        <div className="youtubeVideo">
          <iframe
            title="recipe"
            src="https://www.youtube.com/embed/3AAdKl1UYZs"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }
  render() {
    if (this.state.meal.id === +this.props.match.params.id) {
      return (
        <div className="mealComponent">
          <div className="top card">
            <div className="image">
              <img src={image} alt="Meal" />
            </div>
            {this.renderAboutInfo()}
          </div>
          <div className="ingredients card">
            <div className="header">
              <h3>Ingredients</h3>
            </div>
            {this.state.meal.ingredients.map((ingredient, key) => (
              <ProductInfo key={key} product={ingredient} />
            ))}
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
                label="Select all"
              />
              <Button
                className="shoppingListButton"
                variant="outlined"
                startIcon={<FontAwesomeIcon icon={faPlus} />}
              >
                Add selected to your shopping list
              </Button>
            </div>
          </div>
          <div className="card">
            <h3>Recipe</h3>
            {this.state.meal.recipe.split('\n').map((line, key) => (
              <p key={key}>{line}</p>
            ))}
          </div>
          {this.renderYoutubeVideo()}
          <MealComments></MealComments>
        </div>
      );
    } else {
      return <div>Cannot find element with id = {this.props.match.params.id}</div>;
    }
  }
}

export { Meal };
