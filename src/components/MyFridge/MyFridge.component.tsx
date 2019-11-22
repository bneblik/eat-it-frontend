import React, { Component } from 'react';
import '../../styles/css/my-fridge.styles.css';
import { InputAdornment, Input, FormControl } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faCircle } from '@fortawesome/free-solid-svg-icons';

interface MyFridgeState {
  products: TProduct[];
}

type TProduct = {
  id: number;
  name: string;
  calories: number;
  fats: number;
  protein: number;
  carbs: number;
  amount: number;
};

const products: TProduct[] = [
  { id: 1, name: 'egg', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 10 },
  {
    id: 2,
    name: 'example of a very long product name',
    calories: 10,
    fats: 8,
    protein: 7,
    carbs: 6,
    amount: 1
  },
  { id: 3, name: 'tomatos', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 200 },
  { id: 4, name: 'butter', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 1 },
  { id: 5, name: 'egg', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 10 },
  { id: 6, name: 'bread', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 1 },
  { id: 7, name: 'tomato', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 200 },
  { id: 8, name: 'butter', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 1 },
  { id: 9, name: 'egg', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 10 },
  { id: 10, name: 'bread', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 1 },
  { id: 11, name: 'tomato', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 200 },
  { id: 12, name: 'butter', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 1 }
];

class MyFridge extends Component {
  state: MyFridgeState = {
    products: products
  };
  componentDidMount() {}
  renderProductInFridge(product: TProduct) {
    return (
      <>
        <div className="productName">{product.name}</div>
        <FormControl className="amountControl">
          <Input
            value={product.amount}
            endAdornment={<InputAdornment position="end">g</InputAdornment>}
          ></Input>
        </FormControl>
        {this.renderNutrientsInfo(product)}
        <button className="corner cornerButton">X</button>
      </>
    );
  }
  renderNutrientsInfo(product: TProduct) {
    return (
      <div className="nutrients">
        <span className="circle carbs">
          <FontAwesomeIcon icon={faCircle} title={`carbohydrates: ${product.carbs}g`} size="1x" />
          {` ${product.carbs}g`}
        </span>
        <span className="circle proteins">
          <FontAwesomeIcon icon={faCircle} title={`proteins: ${product.protein}g`} size="1x" />
          {` ${product.protein}g`}
        </span>
        <span className="circle fats">
          <FontAwesomeIcon icon={faCircle} title={`fats: ${product.fats}g`} size="1x" />
          {` ${product.fats}g`}
        </span>
        <span className="circle calories">
          <FontAwesomeIcon icon={faCircle} title={`calories: ${product.calories}`} size="1x" />
          {` ${product.calories}`}
        </span>
      </div>
    );
  }
  renderProductToBuy(product: TProduct) {
    return (
      <>
        <div className="productName">{product.name}</div>
        <FormControl className="amountControl">
          <Input
            value={product.amount}
            endAdornment={<InputAdornment position="end">g</InputAdornment>}
          ></Input>
        </FormControl>
        <div className="corner">
          <button className="cornerButton checkButton">
            <FontAwesomeIcon icon={faCheck} size="1x" />
          </button>
        </div>
      </>
    );
  }
  render() {
    return (
      <>
        <div className="myFridgeComponent">
          <h2>What do I have in my fridge?</h2>
          <div className="productsContainer">
            {this.state.products.map((product, key) => (
              <div key={key} className="productItem">
                {this.renderProductInFridge(product)}
              </div>
            ))}
            <div className="productItem center">
              <FontAwesomeIcon icon={faPlus} size="2x" className="buttonAdd" />
            </div>
          </div>
        </div>
        <div className="myFridgeComponent">
          <h2>What do I need to buy?</h2>
          <div className="productsContainer">
            {this.state.products.map((product, key) => (
              <div key={key} className="productItem">
                {this.renderProductToBuy(product)}
              </div>
            ))}
            <div className="productItem center">
              <FontAwesomeIcon icon={faPlus} size="2x" className="buttonAdd" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { MyFridge };
