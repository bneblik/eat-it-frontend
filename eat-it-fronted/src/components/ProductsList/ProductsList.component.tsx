import React, { Component } from 'react';
import {  Button } from '@material-ui/core';
import { ProductType } from '../../types/Products';
import { removeProduct } from '../../actions/productAction';
import '../../styles/css/products-list.styles.css'

interface ProductsListProps {
    removeProduct: typeof removeProduct,
    productsList: ProductType[]
}

class ProductsList extends Component<ProductsListProps> {
    removeProduct(productId: number){
        this.props.removeProduct(productId);
    }


    render(){
        return (
            <div>
                {this.props.productsList.map((product) => 
                    <div>
                        { product.name}
                        <Button
                            onClick={()=>this.removeProduct(product.id)}
                        >X
                        </Button>
                    </div>
                )}
            </div>

        );
    }
}

export { ProductsList };