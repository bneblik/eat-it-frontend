import React, { Component } from 'react';
import '../styles/css/products.styles.css';
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
  Checkbox,
  Fab,
  Snackbar
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';
import apple from '../styles/images/apple.jpg';
import { Alert } from '@material-ui/lab';
import { ShoppingListProduct, TShoppingList } from '../types/ShoppingList';
import { NutrientsInfo } from '../components/NutrientsInfo/NutrientsInfo.component';
import AddProduct from '../components/AddProduct/AddProduct.component';
import { TFridge, FridgeProduct } from '../types/Fridge';
import { i18n } from '..';

const ShoppingList = 'ShoppingList';
type TProduct = ShoppingListProduct | FridgeProduct;
type TKind = TShoppingList | TFridge;
type ProductsProps = {
  component: 'MyFridge' | 'ShoppingList';
  productsCategories: TKind[];
  addToBasket?: (product: TProduct, category: string) => void;
  changeAmount: (product: TProduct, category: string, amount: string) => void;
  removeProduct: (product: TProduct, category: string) => void;
  saveChanges: () => void;
};

class ProductsHelper extends Component<ProductsProps> {
  renderShoppingList(product: ShoppingListProduct, category: string, key: number) {
    return (
      <FormControl className="productItem" key={key}>
        <FormControlLabel
          control={
            <Checkbox checked={product.inBasket} onChange={() => this.props.addToBasket(product, category)} />
          }
          label={this.renderProduct(product, category)}
        />
      </FormControl>
    );
  }
  renderProduct(product: TProduct, category: string) {
    return (
      <span className="listItem">
        <img src={apple} alt="product"></img>
        <div className="productName">{product.name}</div>
        <span className="amountInput">
          <Input
            value={product.amount}
            type="number"
            onChange={(e) => this.props.changeAmount(product, category, e.target.value)}
            endAdornment={<InputAdornment position="end">g</InputAdornment>}
          ></Input>
        </span>
        <span className="trashButton">
          <IconButton onClick={() => this.props.removeProduct(product, category)}>
            <FontAwesomeIcon icon={faTrash} size="1x" />
          </IconButton>
        </span>
      </span>
    );
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
          {this.props.productsCategories.map((element, key) => (
            <ExpansionPanel defaultExpanded={true} key={key} className="categoryBlock">
              <ExpansionPanelSummary expandIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                <Typography className="title">{element.category}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className="productsDetails">
                {this.selectComponent(element.products, element.category)}
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
        </div>
        <Fab className="stickyButton" variant="extended" onClick={() => this.props.saveChanges()}>
          <FontAwesomeIcon icon={faCheck} />
          {i18n._('Save changes')}
        </Fab>
      </div>
    );
  }

  selectComponent(products: TProduct[], category: string) {
    if (this.props.component === ShoppingList) {
      return this.shoppingListComponent(products, category);
    } else {
      return products.map((product, key) => (
        <div className="productItem" key={key}>
          {this.renderProduct(product, category)}
          <NutrientsInfo kcal={1} proteins={23} carbs={1221} fats={0} />
        </div>
      ));
    }
  }

  shoppingListComponent(products: ShoppingListProduct[], category: string) {
    return products.map((product, prodKey) => {
      return this.renderShoppingList(product, category, prodKey);
    });
  }

  showAlert = () => {
    return (
      <Snackbar open={true} autoHideDuration={6000} onClose={() => {}}>
        <Alert onClose={() => {}} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    );
  };
}

export default ProductsHelper;
