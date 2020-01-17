import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, InputAdornment } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import '../../styles/css/add-product.styles.css';
import { faFilter, faUtensils, faCircle, faBalanceScaleLeft } from '@fortawesome/free-solid-svg-icons';
import { i18n } from '../..';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

type AddProductState = {
  name: string;
  amount: string;
  category: string;
  calories: string;
  carbs: string;
  fats: string;
  protein: string;
  dialogOpened: boolean;
};

type AddProductProps = {
  buttonName: string;
};
const defaultState: AddProductState = {
  name: '',
  amount: '',
  category: '',
  calories: '',
  carbs: '',
  fats: '',
  protein: '',
  dialogOpened: false
};

class AddProduct extends Component<AddProductProps> {
  state: AddProductState = defaultState;

  toggleDialog() {
    const opened = this.state.dialogOpened;
    if (opened) {
      this.setState(defaultState);
    }
    this.setState({
      dialogOpened: !opened
    });
  }

  render() {
    return (
      <>
        <Button
          className="addProduct"
          variant="contained"
          color="inherit"
          size="small"
          onClick={this.toggleDialog.bind(this)}
          startIcon={<FontAwesomeIcon icon={faEdit} />}
        >
          {this.props.buttonName}
        </Button>
        <Dialog open={this.state.dialogOpened} className="addProductComponent">
          <DialogTitle>{i18n._('Add product')}</DialogTitle>
          <DialogContent>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faUtensils} />
              <Autocomplete
                className="autocomplete"
                options={['a', 'ab', 'bc']}
                getOptionLabel={(o) => o}
                onChange={(e, v) => {
                  this.setState({ name: v });
                }}
                value={this.state.name}
                noOptionsText={i18n._('No products')}
                renderInput={(params: any) => (
                  <TextField {...params} value={this.state.name} fullWidth label={i18n._('Name')} />
                )}
              />
            </div>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faBalanceScaleLeft} />
              <TextField
                label={i18n._('Amount')}
                value={this.state.amount}
                onChange={(e) => {
                  this.setState({ amount: e.target.value });
                }}
              />
            </div>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faFilter} />
              <TextField
                label={i18n._('Category')}
                value={this.state.category}
                disabled={true}
                className="disabled"
              />
            </div>
            <fieldset>
              <legend>{i18n._('Nutritents info')}</legend>
              <div className="inputContainer">
                <FontAwesomeIcon className="kcal" icon={faCircle} size="1x" />
                <TextField
                  label={i18n._('Calories')}
                  value={this.state.calories}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">kcal</InputAdornment>
                  }}
                  disabled={true}
                  className="disabled"
                />
              </div>

              <div className="inputContainer">
                <FontAwesomeIcon className="carbs" icon={faCircle} size="1x" />
                <TextField
                  label={i18n._('Carbohydrates')}
                  value={this.state.calories}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">g</InputAdornment>
                  }}
                  disabled={true}
                  className="disabled"
                />
              </div>

              <div className="inputContainer">
                <FontAwesomeIcon className="fats" icon={faCircle} size="1x" />
                <TextField
                  label={i18n._('Fats')}
                  value={this.state.calories}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">g</InputAdornment>
                  }}
                  disabled={true}
                  className="disabled"
                />
              </div>

              <div className="inputContainer">
                <FontAwesomeIcon className="proteins" icon={faCircle} size="1x" />
                <TextField
                  label={i18n._('Proteins')}
                  value={this.state.calories}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">g</InputAdornment>
                  }}
                  disabled={true}
                  className="disabled"
                />
              </div>
            </fieldset>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleDialog.bind(this)} color="primary">
              {i18n._('Cancel')}
            </Button>
            <Button onClick={this.toggleDialog.bind(this)} color="primary">
              {i18n._('Save')}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default AddProduct;
