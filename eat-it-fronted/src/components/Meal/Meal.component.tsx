import React, { Component } from 'react';
import { TMeal } from "../../types/Meals"

interface MealProps { 
    match: { 
        params: { id: string } 
    },
    mealsList: TMeal[]
};
interface MealState {
    meal: TMeal | undefined;
    meals: TMeal[];
}
  



class Meal extends Component<MealProps, MealState> {
    state = {
        meal: undefined,
        meals: []
    };
    componentDidUpdate() {
        if(this.props.mealsList !== this.state.meals){
            const id = this.props.match.params.id;
            const meals = this.props.mealsList;
            this.setState({
                meal: meals.find(meal => meal.id.toString() === id),
                meals
            });        
        }
    }
    
    render() {
        console.log(this.props.mealsList);
        // if(this.state.meal){
        // return (
        //     <div className="mealComponent">
        //         <h1>{this.state.meal.name}</h1>
        //         <div>{this.state.meal.recipe}</div>
        //     </div>
        // );
        // }
        // else {
            return (
                <div>
                    Cannot find element with id = {this.props.match.params.id}
                </div>
            );
        // }
    }
}

export { Meal };
