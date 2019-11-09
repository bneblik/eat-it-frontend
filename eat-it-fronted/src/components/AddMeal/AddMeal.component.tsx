import React, { Component } from 'react';
import {  Card, TextField, CardHeader, Button } from '@material-ui/core';
import { addMeal } from '../../actions/action';

interface AddMealProps {
    addMeal: typeof addMeal;
}


class AddMeal extends Component<AddMealProps> {
    state = {
        name: '',
        recipe: ''
    };
    componentDidMount(){
        this.props.addMeal({
            id: 3,
            name: "addmeal",
            recipe: "addmeal"
          });
    }
    add = () => {
        this.props.addMeal({
            id: 3,
            name: this.state.name,
            recipe: this.state.recipe
        });
        this.setState({name: '', recipe: ''});
    };

    render() {
        return (
            <div className="addMealComponent">
            <Card className="padding">
              <CardHeader title="Add new meal"/>
              <form>
                <div className="padding">
                    <TextField
                    label="Title"
                    value={this.state.name}
                    fullWidth={true}
                    onChange={(e)=>{this.setState({name: e.target.value});}}
                    />
                </div>
                <div className="padding">
                    <TextField
                    label="Recipe"
                    value={this.state.recipe}
                    multiline={true}
                    fullWidth={true}
                    onChange={(e)=>{this.setState({recipe: e.target.value});}}
                    />
                </div>
                <Button
                    className="addButton"
                    variant="contained"
                    color="inherit"
                    size="small"
                    onClick={this.add}
                >
                    Add
                </Button>
            </form>
            </Card>
            </div>
          );
        
    }
}

export { AddMeal };
