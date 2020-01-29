import React, { Component } from 'react';
import { NutrientsInfo } from '../NutrientsInfo/NutrientsInfo.component';
import '../../styles/css/product-info.styles.css';
import { Checkbox } from '@material-ui/core';
import placeholder from '../../styles/images/placeholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { i18n } from '../..';
import { ProductInfoProps } from './ProductInfo.types';
import { API_URL } from '../../utils/RequestService';

/**
 * This component renders short information a product.
 * @author Beata Szczuka
 */
class ProductInfo extends Component<ProductInfoProps> {
  displayImage() {
    const img = this.props.product.image;
    if (!!img) {
      return <img src={`${API_URL}${img}`} alt="product"></img>;
    } else return <img src={placeholder} alt="product"></img>;
  }

  render() {
    const { product, selected } = this.props;
    return (
      <div className="productInfoComponent">
        {this.displayImage()}
        <span>{product.name}</span>
        <div>
          {i18n._('amount')}: {product.amount} {product.unit}
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
