import React from 'react';
import { shallow } from 'enzyme';
import { AddMeal } from './AddMeal.component';
import { ADD_PRODUCT, REMOVE_PRODUCT } from '../../types/Products';
import { ADD_MEAL } from '../../types/Meals';

describe('AddMeal', () => {
    it('renders without crashing', () => {
        shallow(
            <AddMeal 
                addMeal={(x)=>{return {type: ADD_MEAL, meal:x}} }
                removeProduct={(x)=>{return {type: REMOVE_PRODUCT, productId: x}} } 
                productsList={[]} 
                addProduct={(x)=>{return {type: ADD_PRODUCT, product:x}} }
            />
        );
    })
});
