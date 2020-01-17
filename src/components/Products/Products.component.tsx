import React, { Component } from 'react';
import '../../styles/css/products.styles.css';
import {
  InputAdornment,
  Input,
  FormControl,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  IconButton,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import AddProduct from '../AddProduct/AddProduct.component';
import apple from '../../styles/images/apple.jpg';
import { i18n } from '../..';
import { NutrientsInfo } from '../NutrientsInfo/NutrientsInfo.component';

const ShoppingList = 'ShoppingList';
interface ProductsState {
  productsCategories: TShoppingList[];
  selected: string[];
}
type ProductsProps = {
  component: 'MyFridge' | 'ShoppingList';
};

type TProduct = {
  id: number;
  name: string;
  calories: number;
  fats: number;
  protein: number;
  carbs: number;
  amount: number;
  inBasket?: boolean;
};
type TShoppingList = {
  category: string;
  products: TProduct[];
};

const productsCategories: TShoppingList[] = [
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

class Products extends Component<ProductsProps> {
  state: ProductsState = {
    productsCategories: productsCategories,
    selected: []
  };
  handleSelect(name: any) {
    this.setState((prevState: ProductsState) => ({ selected: [...prevState.selected, name] }));
  }
  selectComponent(product: TProduct, key: number) {
    if (this.props.component === ShoppingList) {
      return (
        <FormControl className="productItem" key={key}>
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.selected.includes(product.name)}
                onChange={() => this.handleSelect(product.name)}
              />
            }
            label={this.renderProduct(product)}
          />
        </FormControl>
      );
    } else {
      return (
        <div className="productItem" key={key}>
          {this.renderProduct(product)}
          <NutrientsInfo kcal={1} proteins={23} carbs={1221} fats={0} />
        </div>
      );
    }
  }
  renderProduct(product: TProduct) {
    return (
      <span className="listItem">
        <img src={apple} alt="product"></img>
        <div className="productName">{product.name}</div>
        <span className="amountInput">
          <Input
            value={product.amount}
            onChange={(e) => this.handleChangeAmount(e.target.value, product.name, 'category')}
            endAdornment={<InputAdornment position="end">g</InputAdornment>}
          ></Input>
        </span>
        <span className="trashButton">
          <IconButton>
            <FontAwesomeIcon icon={faTrash} size="1x" />
          </IconButton>
        </span>
      </span>
    );
  }
  handleChangeAmount(value: string, name: string, category: string) {
    console.log(value);
    console.log(name);
    this.setState((prevState: ProductsState) => {
      const found = prevState.productsCategories.find((cat) => cat.category === category);
      if (found) {
        found.products.filter((product) => product.name === name).map((product) => (product.amount = +value));
      }
    });
  }
  render() {
    return (
      <div className="shoppingListComponent">
        <Typography className="title" variant="h5">
          <span>
            {this.props.component === ShoppingList
              ? i18n._('Shopping List')
              : i18n._('What do I have in my fridge?')}
          </span>
          <AddProduct buttonName={i18n._('Add product')} />
        </Typography>
        <div className={`productsContainer ${this.props.component}`}>
          {this.state.productsCategories.map((element, key) => (
            <ExpansionPanel defaultExpanded={true} key={key} className="categoryBlock">
              <ExpansionPanelSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                <Typography className="title">{element.category}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="productsDetails">
                {element.products.map((product, prodKey) => {
                  return this.selectComponent(product, prodKey);
                })}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
      </div>
    );
  }
}

export { Products };
