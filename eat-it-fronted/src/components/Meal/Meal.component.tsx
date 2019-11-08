import React, { Component, Props } from 'react';

interface IProps { match: { params: { id: string } } };
interface IState {
    meal: TMeal | undefined;
  }
  
type TMeal = {
    id: number;
    name: string;
    recipe?: string;
}
const meals: TMeal[] = [
    { id: 1, name: 'soup', recipe: 'Add all ingredients and cook' },
    { id: 2, name: 'sandwich' },
    { id: 3, name: 'cake' },
    { id: 4, name: 'pasta' },
];

class Meal extends Component<IProps, IState> {
    constructor(props: Readonly<IProps>){
        super(props);
        this.state = {
            meal: undefined
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({meal: meals.find(meal => meal.id.toString() === id)});
    }
    render() {
        if(this.state.meal){
        return (
            <div className="mealComponent">
                <h1>{this.state.meal.name}</h1>
                <div>{this.state.meal.recipe}</div>
            </div>
        );
        }
        else {
            return (
                <div>
                    Cannot find element with id = {this.props.match.params.id}
                </div>
            );
        }
    }
}

export { Meal };
