import React, { Component } from 'react';
import '../../styles/css/meal-comments.styles.css';
import { TextField, Button } from '@material-ui/core';
import { subDays, formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { Rating } from '../Rating/Rating.component';

interface MealCommentsState {
  comments: string[];
}

class MealComments extends Component {
  state: MealCommentsState = {
    comments: ['Very tasty!', 'I like it :)', 'Easy to prepare and very tasty.']
  };

  singleComment = (comment: string) => (
    <div className="singleComment">
      <div className="center">
        <FontAwesomeIcon icon={faUserAlt} size="3x" />
      </div>
      <div className="commentInfo">
        <div>
          <span>Abcde</span>
          <Rating className="toRight" stars={3} readonly={true}></Rating>
        </div>
        <span className="date">{formatDistanceToNow(subDays(new Date(), 3), { addSuffix: true })}</span>

        <div>{comment}</div>
      </div>
    </div>
  );

  listComments = () => {
    const list: any = [];
    this.state.comments.forEach((comment) => {
      list.push(this.singleComment(comment));
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
            <Rating className="center" stars={3} readonly={true}></Rating>
            <span>
              <Button className="addComment" variant="contained" color="primary">
                Comment
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
