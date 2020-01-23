import { Component } from 'react';
import React from 'react';
import '../../styles/css/nutrients-info.styles.css';
import { i18n } from '../..';
import { Tooltip } from '@material-ui/core';

interface NutrientsInfoProps {
  /**
   * contains the amount of calories in kcal
   */
  kcal: number | undefined;
  /**
   * contains the amount of fats in grams
   */
  fats: number | undefined;
  /**
   * contains the amount of fats in grams
   */
  carbs: number | undefined;
  /**
   * contains the amount of fats in grams
   */
  proteins: number | undefined;
}

/**
 * This component renders short information about calories, carbohydrates, proteins and fats.
 * @author Beata Szczuka
 */
class NutrientsInfo extends Component<NutrientsInfoProps> {
  render() {
    return (
      <div className="nutrientsInfoComponent">
        <Tooltip title={`${i18n._('Calories')}: ${this.props.kcal} kcal`} placement="bottom-end">
          <span className="circle calories">{`${this.props.kcal} kcal`}</span>
        </Tooltip>
        <Tooltip title={`${i18n._('Carbohydrates')}: ${this.props.carbs} g`} placement="bottom-end">
          <span className="circle carbs">
            <span className="letter">{i18n._('C')}:</span>
            <span id="carbs">{`${this.props.carbs} g`}</span>
          </span>
        </Tooltip>
        <Tooltip title={`${i18n._('Proteins')}: ${this.props.proteins} g`} placement="bottom-end">
          <span className="circle proteins">
            <span className="letter">{i18n._('P')}:</span>
            <span id="proteins">{`${this.props.proteins} g`}</span>
          </span>
        </Tooltip>
        <Tooltip title={`${i18n._('Fats')}: ${this.props.fats} g`} placement="bottom-end">
          <span className="circle fats">
            <span className="letter">{i18n._('F')}:</span>
            <span id="fats">{`${this.props.fats} g`}</span>
          </span>
        </Tooltip>
      </div>
    );
  }
}

export { NutrientsInfo };
