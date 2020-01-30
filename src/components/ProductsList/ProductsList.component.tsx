import React, { Component } from 'react';
import { IconButton, TextField, InputAdornment } from '@material-ui/core';
import '../../styles/css/products-list.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductsListProps } from './ProductsList.types';
import { ProductType } from '../../types/Products';

/**
 * This component displays a list of products that can be removed
 * @author Beata Szczuka
 */
class ProductsList extends Component<ProductsListProps> {
  constructor(props) {
    super(props);
    this.props.productsList.map((p) => (p.amount ? p : { ...p, amount: '' }));
  }
  removeProduct(product: ProductType) {
    this.props.removeProduct(product);
  }

  changeAmount = (product: ProductType, value: string) => {
    this.props.changeAmount(product, value);
  };
  render() {
    return (
      <div className="productListComponent">
        {this.props.productsList.map((product, key) => (
          <div key={key} className="listElem">
            <span>{product.name}</span>
            <TextField
              className="amount"
              type="number"
              label="amount"
              InputProps={{
                endAdornment: <InputAdornment position="end">{product.unit}</InputAdornment>
              }}
              value={product.amount}
              onChange={(e: any) => this.changeAmount(product, e.target.value)}
            />
            <IconButton className="button" onClick={() => this.removeProduct(product)}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </div>
        ))}
      </div>
    );
  }
}

export { ProductsList };
