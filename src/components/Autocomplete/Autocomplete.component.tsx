import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { i18n } from '../..';
import { AutocompleteProps, AutocompleteState, initialAutocompleteState } from './Autocomplete.types';
import { axiosInstance, requestConsts } from '../../utils/RequestService';
import { Autocomplete as MaterialAutocomplete } from '@material-ui/lab';
import { objectToCamelCase } from '../../helpers/Mapper';
import { errorAlert } from '../../helpers/Alert.component';

/**
 * This component renders a new meal adding form.
 * @author Beata Szczuka
 */

export class Autocomplete extends Component<AutocompleteProps, AutocompleteState> {
  constructor(props) {
    super(props);
    this.state = initialAutocompleteState;
  }
  componentDidMount() {
    this.fetchProducts();
  }
  fetchProducts(check?: string) {
    this.setState({ pending: true });
    axiosInstance
      .get(requestConsts.GET_PRODUCTS_URL, { params: { page: 1, check } })
      .then((response) => {
        const fetchedProducts = response.data.data.map((e) => ({
          id: e.id,
          ...objectToCamelCase(e.attributes),
          categoryName: e.attributes.category
        }));
        this.setState({ productsList: fetchedProducts, pending: false });
      })
      .catch((error) => {
        this.setState({ error: error.toString(), pending: false });
      });
  }
  showAlert() {
    if (!this.state.pending && !!this.state.error) {
      return errorAlert({
        isOpen: !!this.state.error,
        message: this.state.error,
        onClose: () => this.setState({ error: null })
      });
    }
  }

  handleUserInput(userInput) {
    this.fetchProducts(userInput);
  }
  render() {
    return (
      <>
        <MaterialAutocomplete
          className="autocomplete"
          options={this.state.productsList}
          getOptionLabel={(o) => (o.name ? o.name : '')}
          filterOptions={() => this.state.productsList}
          loading={this.state.pending}
          onChange={(_, v) => this.props.handleChangeProduct(v)}
          value={this.props.product}
          noOptionsText={i18n._('No products')}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={(e) => this.handleUserInput(e.target.value)}
              label={i18n._('Product')}
              fullWidth
            />
          )}
        />
        {this.showAlert()}
      </>
    );
  }
}
export default Autocomplete;
