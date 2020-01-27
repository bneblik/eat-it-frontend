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
  selected: boolean;
  markAsSelected: (id: number, amount: string, selected: boolean) => void;
}

/**
 * This component renders short information a product.
 * @author Beata Szczuka
 */
class ProductInfo extends Component<ProductInfoProps> {
  render() {
    const { product, selected } = this.props;
    return (
      <div className="productInfoComponent">
        <img src={apple} alt="product"></img>
        <span>{product.name}</span>
        <div>
          {i18n._('amount')}: {product.amount}
        </div>
        <NutrientsInfo
          kcal={product.calories}
          fats={product.fats}
          proteins={product.proteins}
          carbs={product.carbs}
        />
        <Checkbox
          icon={<FontAwesomeIcon icon={faShoppingBasket} />}
          checkedIcon={<FontAwesomeIcon icon={faShoppingBasket} />}
          checked={selected}
          onChange={() => this.props.markAsSelected(product.id, product.amount, selected)}
        />
      </div>
    );
  }
}

export { ProductInfo };
