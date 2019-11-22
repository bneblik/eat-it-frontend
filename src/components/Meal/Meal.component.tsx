import React, { Component } from 'react';
import '../../styles/css/meal.styles.css';
import image from '../../styles/images/placeholder.png';

interface MealProps {
  match: {
    params: { id: string };
  };
}
interface MealState {
  meal: TMeal;
}

type TMeal = {
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
  yields?: number;
};

const meal: TMeal = {
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
  yields: 1
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
        <p>
          <span>Prepare time: {this.state.meal.prepareTime}</span>
          <span> | </span>
          <span>Yields: {this.state.meal.yields}</span>
        </p>
        <p>
          <span>Calories: {this.state.meal.calories}</span>
          <span> | </span>
          <span>Fats: {this.state.meal.fats}</span>
          <span> | </span>
          <span>Carbs: {this.state.meal.carbs}</span>
          <span> | </span>
          <span>Protein: {this.state.meal.protein}</span>
        </p>
      </div>
    );
  }
  render() {
    if (this.state.meal.id === +this.props.match.params.id) {
      return (
        <div className="mealComponent">
          <div className="top">
            <div className="image">
              <img src={image} alt="Meal" />
            </div>
            {this.renderAboutInfo()}
          </div>
          <div className="ingredients">
            <h3>Ingredients</h3>
            {this.state.meal.ingredients.map((ingredient, key) => (
              <p key={key}>
                {key + 1}. {ingredient}
              </p>
            ))}
          </div>
          <div>
            <h3>Recipe</h3>
            {this.state.meal.recipe.split('\n').map((line, key) => (
              <p key={key}>{line}</p>
            ))}
          </div>
          <div></div>
        </div>
      );
    } else {
      return <div>Cannot find element with id = {this.props.match.params.id}</div>;
    }
  }
}

export { Meal };
