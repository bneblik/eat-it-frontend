import React, { Component } from 'react';
import '../../styles/css/all-meals.styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMeals, clearMealsErrors } from '../../actions/mealsAction';
import image from '../../styles/images/background-image.jpg';
import { TextField, FormControlLabel, Switch, Snackbar } from '@material-ui/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Meals from '../Meals/Meals.component';
import { i18n } from '../..';
import { Alert } from '@material-ui/lab';
import { JWT_TOKEN } from '../../utils/RequestService';
import { AllMealsProps, AllMealsState, CATEGORY, ONLY_MY, QUERY } from './AllMeals.types';

/**
 * This component renders the main page of the application.
 * It contains a searcher and the Meals component with search results.
 * @author Beata Szczuka
 */
export class AllMeals extends Component<AllMealsProps, AllMealsState> {
  constructor(props: AllMealsProps) {
    super(props);
    const searchParams = new URLSearchParams(this.props.history.location.search);
    let category = searchParams.get(CATEGORY);
    if (category === null) category = 'all';
    let onlyMy = searchParams.get(ONLY_MY);
    if (onlyMy === null) onlyMy = 'false';
    let query = searchParams.get(QUERY);
    if (query === null) query = '';
    this.state = {
      cat: category,
      onlyMy: onlyMy === 'true' ? true : false,
      searcher: query,
      mealsReducer: {} as any
    };
  }
  componentDidMount() {
    const { fetchMeals, page } = this.props;
    fetchMeals(page);

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
      return;
    const { page } = this.props;
    if (!this.props.last && !this.props.pending) this.props.fetchMeals(page);
    else if (this.props.last) window.removeEventListener('scroll', this.handleScroll);
  };

  onlyMyMeals() {
    if (localStorage.getItem(JWT_TOKEN)) {
      return (
        <FormControlLabel
          control={<Switch checked={this.state.onlyMy} onChange={() => this.handleOnlyMy()} />}
          label={i18n._('only my meals')}
        />
      );
    }
  }

  selectCategory() {
    const options = ['all categories', 'breakfast', 'dinner'];
    return (
      <TextField
        className="selectCategory"
        variant="outlined"
        select
        value={this.state.cat}
        onChange={(e: any) => this.handleCategory(e)}
        SelectProps={{ native: true }}
      >
        {options.map((option, key) => (
          <option key={key} value={option} className="categoryOption">
            {option}
          </option>
        ))}
      </TextField>
    );
  }
  render() {
    return (
      <div className="allMealsComponent">
        <div className="searchPanel">
          <img src={image} alt="Meal" />
          <div className="searchField">
            <TextField
              className="searcher"
              variant="outlined"
              value={this.state.searcher}
              InputProps={{
                startAdornment: <FontAwesomeIcon icon={faSearch} className="padding" />
              }}
              placeholder={i18n._('Search for a meal...')}
              onChange={(e: any) => this.handleSearcher(e)}
            />
            <div className="searchFilters">
              {this.selectCategory()}
              {this.onlyMyMeals()}
            </div>
          </div>
        </div>
        <Meals />
        {this.showAlert()}
      </div>
    );
  }

  handleOnlyMy() {
    const newValue = !this.state.onlyMy;
    this.setState({ onlyMy: newValue });
    this.setUrlParams(newValue, ONLY_MY);
  }
  handleCategory(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = (event.target as HTMLInputElement).value;
    this.setState({ cat: selected });
    this.setUrlParams(selected, CATEGORY);
  }
  handleSearcher(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = (event.target as HTMLInputElement).value;
    this.setState({ searcher: selected });
    this.setUrlParams(selected, QUERY);
  }
  setUrlParams(newValue: any, attr: string) {
    const searchParams = new URLSearchParams(this.props.history.location.search);
    searchParams.set(attr, newValue);
    this.props.history.push({ search: searchParams.toString() });
    // fetchMeals();
  }
  clearErrors() {
    this.props.clearMealsErrors();
  }

  showAlert = () => {
    return (
      <Snackbar open={!!this.props.error}>
        <Alert
          id="alert"
          onClose={() => {
            this.props.clearMealsErrors();
          }}
          severity="error"
        >
          {this.props.error}
        </Alert>
      </Snackbar>
    );
  };
}

const mapStateToProps = (state: AllMealsState) => {
  return {
    error: state.mealsReducer.error,
    meals: state.mealsReducer.meals,
    pending: state.mealsReducer.pending,
    last: state.mealsReducer.last,
    page: state.mealsReducer.page
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchMeals: fetchMeals,
      clearMealsErrors: clearMealsErrors
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllMeals);
