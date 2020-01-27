import React, { Component } from 'react';
import '../../styles/css/recipe.styles.css';
import { TextField, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { i18n } from '../..';

interface RecipeProps {
  /**
   * List of steps in the recipe
   */
  steps: string[];
  removeStep: (step: string) => void;
  addStep: (step: string) => void;
}

interface RecipeState {
  newStep: string;
}

/**
 *  This component is a list of recipe steps with possibility to delete and a form for adding a new step
 * @author Beata Szczuka
 */
class Recipe extends Component<RecipeProps> {
  state: RecipeState = {
    newStep: ''
  };

  displaySteps() {
    const stepsList: any[] = [];
    if (this.props.steps.length === 0)
      return <div className="emptyInfo">{i18n._('Your recipe is still empty. Add a step.')}</div>;
    this.props.steps.forEach((step, i) =>
      stepsList.push(
        <div key={i} className="step">
          <span className="stepNumber">{i + 1}.</span>
          <TextField
            variant="outlined"
            value={step}
            multiline={true}
            fullWidth={true}
            onChange={(e) => {
              this.setState({ recipe: e.target.value });
            }}
          />
          <IconButton onClick={() => this.removeStep(step)}>
            <FontAwesomeIcon icon={faTrash} />
          </IconButton>
        </div>
      )
    );
    return stepsList;
  }

  addStep = () => {
    if (this.state.newStep !== '') {
      this.props.addStep(this.state.newStep);
      this.setState({ newStep: '' });
    }
  };

  removeStep = (step: string) => {
    this.props.removeStep(step);
  };

  render() {
    return (
      <div className="recipeComponent">
        <div className="title">{i18n._('Recipe')}</div>
        <div className="steps">
          {this.displaySteps()}
          <div className="step">
            <TextField
              variant="outlined"
              required
              label={i18n._('Add step')}
              value={this.state.newStep}
              multiline={true}
              fullWidth={true}
              onChange={(e) => {
                this.setState({ newStep: e.target.value });
              }}
            />
            <IconButton className="add" disabled={this.state.newStep === ''} onClick={this.addStep}>
              <FontAwesomeIcon icon={faPlus} />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export { Recipe };
