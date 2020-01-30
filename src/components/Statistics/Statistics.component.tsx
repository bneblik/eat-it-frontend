import React, { Component } from 'react';
import '../../styles/css/statistics.styles.css';
import { connect } from 'react-redux';
import { i18n } from '../..';
import { fetchStatisticsForDay, clearStatisticsError } from '../../actions/statisticsAction';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faLongArrowAltUp, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { Zoom, Button } from '@material-ui/core';
import { Skeleton, Alert } from '@material-ui/lab';
import { errorAlert } from '../../helpers/Alert.component';
import { StatisticsProps, StatisticsComponentState } from './Statistics.types';
import { routes, lang } from '../App/RouteConstants';

/**
 * This component renders quantity information about nutrients delivered on a given @param day
 * @author Beata Szczuka
 */
export class Statistics extends Component<StatisticsProps, StatisticsComponentState> {
  state: StatisticsComponentState = {
    statisticsReducer: {} as any,
    zoom: true
  };
  componentDidMount() {
    this.props.fetchStatisticsForDay(this.props.day);
  }

  renderNutrientInfo(value, unit) {
    if (value > 0)
      return (
        <div className="textInfo">
          {`${value} ${unit} ${i18n._('too many')}`} <FontAwesomeIcon icon={faLongArrowAltUp} />
        </div>
      );
    else if (value < 0)
      return (
        <div className="textInfo">
          {`${-1 * value} ${unit} ${i18n._('too little')}`} <FontAwesomeIcon icon={faLongArrowAltDown} />
        </div>
      );
    return <div className="textInfo">{i18n._('Perfect amount!')}</div>;
  }

  render() {
    if (this.props.statistics) {
      return (
        <div className="statisticsComponent">
          <Zoom in={this.state.zoom} timeout={500}>
            <div className="circle calories">
              <span>
                <span className="nutrientName">Calories:</span>
                {this.renderNutrientInfo(this.props.statistics.calories, 'kcal')}
              </span>
            </div>
          </Zoom>
          <Zoom in={this.state.zoom} timeout={600}>
            <div className="circle carbs">
              <span>
                <span className="nutrientName">Carbohydrates:</span>
                {this.renderNutrientInfo(this.props.statistics.carbs, 'g')}
              </span>
            </div>
          </Zoom>
          <Zoom in={this.state.zoom} timeout={700}>
            <div className="circle proteins">
              <span>
                <span className="nutrientName">Proteins:</span>
                {this.renderNutrientInfo(this.props.statistics.proteins, 'g')}
              </span>
            </div>
          </Zoom>
          <Zoom in={this.state.zoom} timeout={800}>
            <div className="circle fats">
              <span>
                <span className="nutrientName">Fats:</span>
                {this.renderNutrientInfo(this.props.statistics.fats, 'g')}
              </span>
            </div>
          </Zoom>
          {this.showAlert()}
        </div>
      );
    } else if (this.props.pending) {
      return this.showSkeleton();
    } else
      return (
        <div className="statisticsComponent empty">
          <Alert severity="info">
            <span>
              {i18n._('Enter your height and weight to control your nutrient requirements.')}
              <Button href={`${lang()}${routes.userPanel}`} onClick={(e) => this.fun(e.target)}>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
              </Button>
            </span>
          </Alert>
        </div>
      );
  }
  fun(anchor) {
    anchor.href = `${lang()}${routes.userPanel}`;
  }

  showAlert() {
    if (!this.props.pending && !!this.props.error) {
      return errorAlert({
        isOpen: !!this.props.error,
        message: this.props.error,
        onClose: () => this.props.clearStatisticsError()
      });
    }
  }

  showSkeleton() {
    const circles = [];
    for (let i = 0; i < 4; i++) {
      circles.push(<Skeleton key={i} variant="circle" className="circle" />);
    }
    return <div className="statisticsComponent">{circles}</div>;
  }
}
const mapStateToProps = (state: StatisticsComponentState) => {
  return {
    statistics: state.statisticsReducer.statistics,
    pending: state.statisticsReducer.pending,
    error: state.statisticsReducer.error
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchStatisticsForDay,
      clearStatisticsError
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Statistics);
