import React from 'react';
import { shallow } from 'enzyme';
import { ProductsList } from './ProductsList.component';

describe('ProductsList', () => {
  it('renders without crashing', () => {
    shallow(
      <ProductsList
        productsList={[]}
        changeAmount={() => {}}
        removeProduct={(id) => {
          return { type: 'REMOVE_PRODUCT', productId: id };
        }}
      />
    );
  });
});
