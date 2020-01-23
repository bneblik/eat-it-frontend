import React, { Component } from 'react';
import '../../styles/css/statistics.styles.css';
import { connect } from 'react-redux';
import { i18n } from '../..';
import { fetchStatisticsForDay } from '../../actions/statisticsAction';
import { StatisticsType, StatisticsState } from '../../types/Statistics';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltDown, faLongArrowAltUp } from '@fortawesome/free-solid-svg-icons';
import { Zoom } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

interface StatisticsProps {
  day: Date;
  /**
   * fetches statistick for @param day
   */
  fetchStatisticsForDay: typeof fetchStatisticsForDay;
  /**
   * contains fetched statistics
   * value in relation to the user's daily demand calculated,
   * based on the height and weight @see UserPanel
   */
  statistics: StatisticsType | undefined;
  /**
   * determines whether fetching is pending
   */
  pending: boolean;
}
interface StatisticsComponentState {
  statisticsReducer: StatisticsState;
  zoom: boolean;
}

/**
 * This component renders quantity information about nutrients delivered on a given @param day
 * @author Beata Szczuka
 */
export class Statistics extends Component<StatisticsProps, StatisticsComponentState> {
  state: StatisticsComponentState = {
    statisticsReducer: {} as any,
    zoom: false
  };
  componentDidMount() {
    this.props.fetchStatisticsForDay(this.props.day);
    document.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const wrappedElement = document.getElementsByClassName('statisticsComponent');
    if (document.documentElement.scrollTop < wrappedElement[0].scrollHeight) return;
    this.setState({ zoom: true });
    document.removeEventListener('scroll', this.handleScroll);
  };

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
        </div>
      );
    } else if (this.props.pending) {
      return this.showSkeleton();
    } else return <div className="statisticsComponent"></div>;
  }

  showSkeleton() {
    const circles = [];
    for (let i = 0; i < 4; i++) {
      circles.push(<Skeleton variant="circle" className="circle" />);
    }
    return <div className="statisticsComponent">{circles}</div>;
  }
}
const mapStateToProps = (state: StatisticsComponentState) => {
  return {
    statistics: state.statisticsReducer.statistics,
    pending: state.statisticsReducer.pending
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchStatisticsForDay
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Statistics);
