import React, { Component } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

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
          startIcon={<FontAwesomeIcon icon={faEdit} />}
        >
          Other
        </Button>
        <Dialog open={this.state.dialogOpened} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Create a new product</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
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
