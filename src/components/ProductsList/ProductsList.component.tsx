import React, { Component } from 'react';
import { IconButton } from '@material-ui/core';
import { ProductType } from '../../types/Products';
import { removeProduct } from '../../actions/productAction';
import '../../styles/css/products-list.styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface ProductsListProps {
  removeProduct: typeof removeProduct;
  productsList: ProductType[];
}

class ProductsList extends Component<ProductsListProps> {
  removeProduct(productId: number) {
    this.props.removeProduct(productId);
  }

  render() {
    return (
      <div className="productListComponent">
        {this.props.productsList.map((product) => (
          <div key={product.id}>
            {product.name}
            <IconButton onClick={() => this.removeProduct(product.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </div>
        ))}
      </div>
    );
  }
}

export { ProductsList };
