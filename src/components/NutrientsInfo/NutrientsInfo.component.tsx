import { Component } from 'react';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import '../../styles/css/nutrients-info.styles.css';

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
        <span className="circle carbs">
          <FontAwesomeIcon icon={faCircle} title={`carbohydrates: ${this.props.carbs}`} size="1x" />
          {` carbs: ${this.props.carbs}g`}
        </span>
        <span className="circle proteins">
          <FontAwesomeIcon icon={faCircle} title={`proteins: ${this.props.proteins}`} size="1x" />
          {` proteins: ${this.props.proteins}g`}
        </span>
        <span className="circle fats">
          <FontAwesomeIcon icon={faCircle} title={`fats: ${this.props.fats}`} size="1x" />
          {` fats: ${this.props.fats}g`}
        </span>
        <span className="circle calories">
          <FontAwesomeIcon icon={faCircle} title={`calories: ${this.props.kcal}`} size="1x" />
          {` kcal: ${this.props.kcal}`}
        </span>
      </div>
    );
  }
}

export { NutrientsInfo };
