import React, { Component } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import '../../styles/css/add-product.styles.css';
import { faFilter, faUtensils, faCircle, faCamera } from '@fortawesome/free-solid-svg-icons';

type AddProductState = {
  name: string;
  calories: string;
  carbs: string;
  fats: string;
  protein: string;
  dialogOpened: boolean;
};

type AddProductProps = {
  buttonName: string;
};

class AddProduct extends Component<AddProductProps> {
  state: AddProductState = {
    name: '',
    calories: '',
    carbs: '',
    fats: '',
    protein: '',
    dialogOpened: false
  };

  toggleDialog() {
    this.setState((prevState: AddProductState) => ({
      dialogOpened: !prevState.dialogOpened
    }));
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
          <DialogTitle id="form-dialog-title">Add product</DialogTitle>
          <DialogContent>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faUtensils} />
              <TextField
                label="Name"
                value={this.state.name}
                onChange={(e) => {
                  this.setState({ name: e.target.value });
                }}
              />
            </div>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faFilter} />
              <TextField
                label="Category"
                value={this.state.calories}
                select
                onChange={(e) => {
                  this.setState({ calories: e.target.value });
                }}
              />
            </div>
            <div className="inputContainer">
              <FontAwesomeIcon icon={faCamera} />
              <div>
                <Button variant="contained" className="uploadImage">
                  Add image
                </Button>
              </div>
            </div>
            <fieldset>
              <legend>Nutritents info</legend>
              <div className="inputContainer">
                <FontAwesomeIcon className="kcal" icon={faCircle} size="1x" />
                <TextField
                  label="Calories"
                  value={this.state.calories}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">kcal</InputAdornment>
                  }}
                  onChange={(e) => {
                    this.setState({ calories: e.target.value });
                  }}
                />
              </div>

              <div className="inputContainer">
                <FontAwesomeIcon className="carbs" icon={faCircle} size="1x" />
                <TextField
                  label="Carbohydrates"
                  value={this.state.calories}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">g</InputAdornment>
                  }}
                  onChange={(e) => {
                    this.setState({ calories: e.target.value });
                  }}
                />
              </div>

              <div className="inputContainer">
                <FontAwesomeIcon className="fats" icon={faCircle} size="1x" />
                <TextField
                  label="Fats"
                  value={this.state.calories}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">g</InputAdornment>
                  }}
                  onChange={(e) => {
                    this.setState({ calories: e.target.value });
                  }}
                />
              </div>

              <div className="inputContainer">
                <FontAwesomeIcon className="proteins" icon={faCircle} size="1x" />
                <TextField
                  label="Proteins"
                  value={this.state.calories}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">g</InputAdornment>
                  }}
                  onChange={(e) => {
                    this.setState({ calories: e.target.value });
                  }}
                />
              </div>
            </fieldset>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleDialog.bind(this)} color="primary">
              Cancel
            </Button>
            <Button onClick={this.toggleDialog.bind(this)} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export { AddProduct };