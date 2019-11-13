import React, { Component } from 'react';
import {  Card, TextField, CardHeader, Button } from '@material-ui/core';

class AddMeal extends Component {
    render() {
        return (
            <div className="addMealComponent">
            <Card className="padding">
              <CardHeader title="Add new meal"/>
              <form>
                <div className="padding">
                    <TextField
                    label="Title"
                    fullWidth={true}
                    />
                </div>
                <div className="padding">
                    <TextField
                    label="Recipe"
                    multiline={true}
                    fullWidth={true}
                    />
                </div>
                <Button
                    className="addButton"
                    variant="contained"
                    color="inherit"
                    size="small"
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
