import React, { Component } from 'react';
import { Button, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import '../../styles/css/add-product.styles.css';
import { i18n } from '../..';
import { EditMealProps, EditMealState, defultStateEditMeal } from './EditMeal.types';
import AddMeal from '../AddMeal/AddMeal.component';

/**
 * This component renders a product adding form.
 * @author Beata Szczuka
 */
export class EditMeal extends Component<EditMealProps> {
  state: EditMealState = defultStateEditMeal;

  close() {
    this.setState({
      dialogOpened: false
    });
  }
  open() {
    this.setState({
      dialogOpened: true
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
          onClick={this.open.bind(this)}
          startIcon={<FontAwesomeIcon icon={faEdit} />}
        >
          {i18n._('Edit meal')}
        </Button>
        <Dialog
          open={this.state.dialogOpened}
          onClose={this.close.bind(this)}
          className="addProductComponent"
        >
          <DialogTitle>{i18n._('Edit meal')}</DialogTitle>
          <DialogContent>
            <AddMeal mealToEdit={this.props.mealToEdit} />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default EditMeal;
