import React from 'react';
import { shallow } from 'enzyme';
import { Meals } from './Meals.component';

describe('Meals', () => {
    it('renders without crashing', () => {
        shallow(<Meals mealsList={[]}/>);
    })
});
