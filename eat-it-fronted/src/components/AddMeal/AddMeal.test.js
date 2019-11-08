import React from 'react';
import { shallow } from 'enzyme';
import { AddMeal } from './AddMeal.component';

describe('AddMeal', () => {
    it('renders without crashing', () => {
        shallow(<AddMeal />);
    })
});
