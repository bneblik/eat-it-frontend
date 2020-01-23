import React, { Component } from 'react';
import { NutrientsInfo } from '../NutrientsInfo/NutrientsInfo.component';
import '../../styles/css/product-info.styles.css';
import { Checkbox } from '@material-ui/core';
import apple from '../../styles/images/banana.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { i18n } from '../..';
import { ProductType } from '../../types/Products';

interface ProductInfoProps {
  /**
   * contains information about product to display
   */
  product: ProductType;
}

/**
 * This component renders short information a product.
 * @author Beata Szczuka
 */
class ProductInfo extends Component<ProductInfoProps> {
  render() {
    return (
      <div className="productInfoComponent">
        <img src={apple} alt="product"></img>
        <span>{this.props.product}</span>
        <div>
          {i18n._('amount')}: {this.props.product.amount}
        </div>
        <NutrientsInfo
          kcal={this.props.product.calories}
          fats={this.props.product.fats}
          proteins={this.props.product.proteins}
          carbs={this.props.product.carbs}
        />
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
