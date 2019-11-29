import React, { Component } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

type CreateProductState = {
  name: string;
  calories: string;
  carbs: string;
  fats: string;
  protein: string;
  dialogOpened: boolean;
};

class CreateProduct extends Component {
  state: CreateProductState = {
    name: '',
    calories: '',
    carbs: '',
    fats: '',
    protein: '',
    dialogOpened: false
  };

  toggleDialog() {
    this.setState((prevState: CreateProductState) => ({
      dialogOpened: !prevState.dialogOpened
    }));
  }

  render() {
    return (
      <>
        <Button
          className="createProduct"
          variant="contained"
          color="inherit"
          size="small"
          onClick={this.toggleDialog.bind(this)}
        >
          Create new product
        </Button>
        <Dialog open={this.state.dialogOpened} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create new product</DialogTitle>
          <DialogContent>
            <TextField
              label="Title"
              value={this.state.name}
              fullWidth={true}
              onChange={(e) => {
                this.setState({ name: e.target.value });
              }}
            />
            <TextField
              label="Calories"
              value={this.state.calories}
              fullWidth={true}
              onChange={(e) => {
                this.setState({ calories: e.target.value });
              }}
            />
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

export { CreateProduct };
