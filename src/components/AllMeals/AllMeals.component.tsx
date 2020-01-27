import React, { Component } from 'react';
import '../../styles/css/all-meals.styles.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchMeals, clearMealsErrors } from '../../actions/mealsAction';
import { TMeal } from '../../types/MealTypes';
import { MealsStateType } from '../../types/MealsTypes';
import image from '../../styles/images/background-image.jpg';
import { TextField, FormControlLabel, Switch, Snackbar } from '@material-ui/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Meals from '../Meals/Meals.component';
import { i18n } from '../..';
import { History, LocationState } from 'history';
import { Alert } from '@material-ui/lab';
import { JWT_TOKEN } from '../../utils/RequestService';

interface AllMealsProps {
  /**
   * contains an error message or is null
   */
  error: any | null;
  /**
   * contains a list of meals to display
   */
  meals: TMeal[];
  /**
   * determines whether adding is pending
   */
  pending: boolean;
  /**
   * fetches meals and dispatches the result
   */
  fetchMeals: typeof fetchMeals;
  /**
   * clears @param error
   */
  clearMealsErrors: typeof clearMealsErrors;
  /**
   * contains @param search
   */
  history: History<LocationState>;
}
type AllMealsState = { mealsReducer: MealsStateType; cat: string; onlyMy: boolean; searcher: string };
const CATEGORY = 'c';
const ONLY_MY = 'onlyMy';
const QUERY = 'q';

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
    const { fetchMeals } = this.props;
    fetchMeals();
  }

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
    fetchMeals();
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
    pending: state.mealsReducer.pending
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
