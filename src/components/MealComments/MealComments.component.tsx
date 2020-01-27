import React, { Component } from 'react';
import '../../styles/css/meal-comments.styles.css';
import { TextField, Button } from '@material-ui/core';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import Rating from '@material-ui/lab/Rating';
import { i18n } from '../..';
import {
  addMealComment,
  clearMealCommentsErrors,
  clearMealCommentsSuccess
} from '../../actions/mealCommentsAction';
import { CommentType, MealCommentStateType } from '../../types/MealCommentsTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showAlert } from '../../helpers/Alert.component';

interface MealCommentsProps {
  addMealComment: typeof addMealComment;
  clearMealCommentsErrors: typeof clearMealCommentsErrors;
  clearMealCommentsSuccess: typeof clearMealCommentsSuccess;
  comments: CommentType[];
  mealId: number;
  pending: boolean;
  error: any;
  success: any;
}
interface MealCommentsState {
  comment: string;
  rate: number;
  mealCommentsReducer: MealCommentStateType;
}

const initialState: MealCommentsState = {
  comment: '',
  rate: 0,
  mealCommentsReducer: {} as any
};
/**
 * This component renders given list of comments of a meal
 * @author Beata Szczuka
 */
export class MealComments extends Component<MealCommentsProps> {
  state: MealCommentsState = initialState;

  addComment = () => {
    this.props.addMealComment(this.state.comment, this.state.rate, this.props.mealId);
    this.setState(initialState);
  };
  singleComment = (comment: CommentType, key: number) => (
    <div className="singleComment" key={key}>
      <div className="center">
        <FontAwesomeIcon icon={faUserAlt} size="3x" />
      </div>
      <div className="commentInfo">
        <div>
          <span>{comment.author}</span>
          <Rating value={comment.rate} precision={0.5} />
        </div>
        <span className="date">{formatDistanceToNow(comment.createdAt, { addSuffix: true })}</span>

        <div>{comment.content}</div>
      </div>
    </div>
  );

  listComments = () => {
    const list: any = [];
    this.props.comments.forEach((comment, key) => {
      list.push(this.singleComment(comment, key));
    });
    return list;
  };

  render() {
    const { pending, error, success, clearMealCommentsErrors, clearMealCommentsSuccess } = this.props;
    return (
      <div className="mealCommentsComponent">
        <TextField
          multiline={true}
          label="Leave a comment"
          variant="outlined"
          value={this.state.comment}
          onChange={(e) => this.setState({ comment: e.target.value })}
          fullWidth={true}
          rows="3"
        ></TextField>
        <div>
          <span className="rightGroup">
            <Rating
              name="rate"
              value={this.state.rate}
              precision={0.5}
              onChange={(_, newValue) => {
                this.setState({ rate: newValue });
              }}
            />
            <span>
              <Button
                className="addComment"
                onClick={() => this.addComment()}
                variant="contained"
                color="primary"
              >
                {i18n._('Comment & rate')}
              </Button>
            </span>
          </span>
        </div>
        <div>{this.listComments()}</div>
        {showAlert(pending, error, success, clearMealCommentsErrors, clearMealCommentsSuccess)}
      </div>
    );
  }
}

const mapStateToProps = (state: MealCommentsState) => {
  return {
    error: state.mealCommentsReducer.error,
    success: state.mealCommentsReducer.success,
    pending: state.mealCommentsReducer.pending
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      addMealComment,
      clearMealCommentsSuccess,
      clearMealCommentsErrors
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealComments);
