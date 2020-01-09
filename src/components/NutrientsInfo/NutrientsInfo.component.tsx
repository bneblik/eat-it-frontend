import { Component } from 'react';
import React from 'react';
import '../../styles/css/nutrients-info.styles.css';
import { i18n } from '../..';
import { Tooltip } from '@material-ui/core';

interface NutrientsInfoProps {
  kcal: number | undefined;
  fats: number | undefined;
  carbs: number | undefined;
  proteins: number | undefined;
}

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
            {`${this.props.carbs} g`}
          </span>
        </Tooltip>
        <Tooltip title={`${i18n._('Proteins')}: ${this.props.proteins} g`} placement="bottom-end">
          <span className="circle proteins">
            <span className="letter">{i18n._('P')}:</span>
            {`${this.props.proteins} g`}
          </span>
        </Tooltip>
        <Tooltip title={`${i18n._('Fats')}: ${this.props.fats} g`} placement="bottom-end">
          <span className="circle fats">
            <span className="letter">{i18n._('F')}:</span>
            {`${this.props.fats} g`}
          </span>
        </Tooltip>
      </div>
    );
  }
}

export { NutrientsInfo };
