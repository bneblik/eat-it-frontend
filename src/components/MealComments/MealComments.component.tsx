import React, { Component } from 'react';
import '../../styles/css/meal-comments.styles.css';
import { TextField, Button } from '@material-ui/core';
import { subDays, formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import Rating from '@material-ui/lab/Rating';
import { i18n } from '../..';

interface MealCommentsState {
  comments: string[];
}

/**
 * This component renders given list of comments of a meal
 * @author Beata Szczuka
 */
class MealComments extends Component {
  state: MealCommentsState = {
    comments: ['Very tasty!', 'I like it :)', 'Easy to prepare and very tasty.']
  };

  singleComment = (comment: string, key: number) => (
    <div className="singleComment" key={key}>
      <div className="center">
        <FontAwesomeIcon icon={faUserAlt} size="3x" />
      </div>
      <div className="commentInfo">
        <div>
          <span>Abcde</span>
          <Rating
            value={3}
            precision={0.5}
            onChange={(_, newValue) => {
              console.log(newValue);
            }}
          />
        </div>
        <span className="date">{formatDistanceToNow(subDays(new Date(), 3), { addSuffix: true })}</span>

        <div>{comment}</div>
      </div>
    </div>
  );

  listComments = () => {
    const list: any = [];
    this.state.comments.forEach((comment, key) => {
      list.push(this.singleComment(comment, key));
    });
    return list;
  };

  render() {
    return (
      <div className="mealCommentsComponent">
        <TextField
          multiline={true}
          label="Leave a comment"
          variant="outlined"
          fullWidth={true}
          rows="3"
        ></TextField>
        <div>
          <span className="rightGroup">
            <Rating
              value={3}
              precision={0.5}
              onChange={(_, newValue) => {
                console.log(newValue);
              }}
            />
            <span>
              <Button className="addComment" variant="contained" color="primary">
                {i18n._('Comment')}
              </Button>
            </span>
          </span>
        </div>
        <div>{this.listComments()}</div>
      </div>
    );
  }
}

export { MealComments };
