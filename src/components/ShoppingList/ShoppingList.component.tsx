import React, { Component } from 'react';
import '../../styles/css/shopping-list.styles.css';
import {
  InputAdornment,
  Input,
  FormControl,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  Button
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface MyFridgeState {
  shoppingList: TShoppingList[];
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
type TShoppingList = {
  category: string;
  products: TProduct[];
};

const shoppingList: TShoppingList[] = [
  {
    category: 'first category',
    products: [
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
    ]
  },
  {
    category: 'second category',
    products: [
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
      { id: 4, name: 'butter', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 1 }
    ]
  },
  {
    category: 'third category',
    products: [
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
      { id: 4, name: 'butter', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 1 }
    ]
  },
  {
    category: 'fourth category',
    products: [
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
      { id: 4, name: 'butter', calories: 10, fats: 8, protein: 7, carbs: 6, amount: 1 }
    ]
  }
];

class ShoppingList extends Component {
  state: MyFridgeState = {
    shoppingList: shoppingList
  };

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
      <div className="shoppingListComponent">
        <h2>
          Shopping List
          <Button className="addProduct" variant="contained" startIcon={<FontAwesomeIcon icon={faPlus} />}>
            Add to list
          </Button>
        </h2>
        <div className="productsContainer">
          {this.state.shoppingList.map((element, key) => (
            <ExpansionPanel key={key} className="categoryBlock">
              <ExpansionPanelSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                <Typography className="title">{element.category}</Typography>
              </ExpansionPanelSummary>
              {element.products.map((product, prodKey) => (
                <ExpansionPanelDetails key={prodKey} className="productItem">
                  {this.renderProductToBuy(product)}
                </ExpansionPanelDetails>
              ))}
            </ExpansionPanel>
          ))}
        </div>
      </div>
    );
  }
}

export { ShoppingList };
