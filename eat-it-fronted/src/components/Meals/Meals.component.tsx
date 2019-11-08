import React, { Component } from 'react';
import { Link, Card, CardHeader, CardContent, Typography, CardActionArea } from '@material-ui/core';

const meals = [
    { id: 1, name: 'soup', recipe: 'Add all ingredients and cook' },
    { id: 2, name: 'sandwich', recipe: 'aaaaaaaaaaa' },
    { id: 3, name: 'cake', recipe: 'bbbbbbbbb' },
    { id: 4, name: 'pasta', recipe: 'cccccccccc' },
];

class Meals extends Component {
    render() {
        return (
            <div className="mealsComponent">
                <h1>Meals:</h1>
                <div>
                    {meals.map(meal => (
                          <Card key={meal.id} className="card">
                          <CardActionArea>
                            <Link href={`/meal/${meal.id}`} color="inherit" underline="none">
                              <CardHeader
                                title={meal.name}
                              />
                              </Link>
                              </CardActionArea>

                              <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  {meal.recipe}
                                </Typography>
                              </CardContent>
                            </Card>
                           
                    ))}
                </div>
                
            </div>
        );
    }
}

export { Meals };
