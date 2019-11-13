import React, { Component } from 'react';
import { Link, Card, CardHeader, CardContent, Typography, CardActionArea } from '@material-ui/core';
import { TMeal } from "../../types/Meals"
import '../../styles/css/meals.styles.css'

export interface MealsProps {
  mealsList: TMeal[];
}


class Meals extends Component<MealsProps> {
    render() {
        return (
            <div className="mealsComponent">
                <h1>Meals:</h1>
                <div>
                    {this.props.mealsList.map(meal => (
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
