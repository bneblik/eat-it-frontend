import React, { Component } from 'react';
import { NutrientsInfo } from '../NutrientsInfo/NutrientsInfo.component';
import '../../styles/css/product-info.styles.css';
import { Checkbox } from '@material-ui/core';
import apple from '../../styles/images/banana.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

interface ProductInfoProps {
  key?: number;
  product: string;
}

class ProductInfo extends Component<ProductInfoProps> {
  render() {
    return (
      <div className="productInfoComponent" key={this.props.key}>
        <img src={apple} alt="product"></img>
        <span>{this.props.product}</span>
        <div>amount: 120g</div>
        <NutrientsInfo kcal={1} fats={2} proteins={3} carbs={4} />
        <Checkbox
          icon={<FontAwesomeIcon icon={faShoppingBasket} />}
          checkedIcon={<FontAwesomeIcon icon={faShoppingBasket} />}
          value={true}
        />
      </div>
    );
  }
}

export { ProductInfo };
