import React, { Component } from 'react';
import '../../styles/css/meal.styles.css';

interface MealProps {
  match: {
    params: { id: string };
  };
  mealsList: TMeal[];
}
interface MealState {
  meal: TMeal | undefined;
}

type TMeal = {
  id: number;
  name: string;
  recipe?: string;
};

class Meal extends Component<MealProps, MealState> {
  constructor(props: Readonly<MealProps>) {
    super(props);
    this.state = {
      meal: undefined
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({
      meal: this.props.mealsList.find((meal) => meal.id.toString() === id)
    });
  }
  render() {
    if (this.state.meal) {
      return (
        <div className="mealComponent">
          <h1>{this.state.meal.name}</h1>
          <div>{this.state.meal.recipe}</div>
        </div>
      );
    } else {
      return <div>Cannot find element with id = {this.props.match.params.id}</div>;
    }
  }
}

export { Meal };
