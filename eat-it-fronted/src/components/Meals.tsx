import React, {Component} from 'react';

const meals = [
  { id: 1, name: 'soup', recipe: 'Add all ingredients and cook'},
  { id: 2, name: 'sandwich'},
  { id: 3, name: 'cake'},
  { id: 4, name: 'pasta'}
];
class Meals extends Component {

  render() {
    return (
        <div>
          <h1>Meals:</h1>
          <ul>
            { meals.map((meal) => (
              <li>
                <h2>{ meal.name }</h2>
                <div>
                  {meal.recipe}
                </div>
              </li>
            ))}
          </ul>
        </div>
    );
  }
}
  
export { Meals };