import React, { Component } from 'react';
import { NutrientsInfo } from '../NutrientsInfo/NutrientsInfo.component';
import '../../styles/css/product-info.styles.css';
import { Button } from '@material-ui/core';

interface ProductInfoProps {
  key?: number;
  product: string;
}

class ProductInfo extends Component<ProductInfoProps> {
  render() {
    return (
      <div className="productInfoComponent" key={this.props.key}>
        <span>{this.props.product}</span>
        <div>amount: 120g</div>
        <NutrientsInfo kcal={1} fats={2} proteins={3} carbs={4} />
        <Button>To buy</Button>
      </div>
    );
  }
}

export { ProductInfo };
