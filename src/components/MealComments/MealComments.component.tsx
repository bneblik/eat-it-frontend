import React, { Component } from 'react';
import '../../styles/css/meal-comments.styles.css';
import { TextField, Button, IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import Rating from '@material-ui/lab/Rating';
import { i18n } from '../..';
import {
  addMealComment,
  clearMealCommentsErrors,
  clearMealCommentsSuccess,
  removeComment,
  fetchComments
} from '../../actions/mealCommentsAction';
import { CommentType } from '../../types/MealCommentsTypes';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showAlert, errorAlert } from '../../helpers/Alert.component';
import { MealCommentsProps, MealCommentsState, initialStateMeal } from './MealComments.types';
import { JWT_TOKEN } from '../../utils/RequestService';
import { Skeleton } from '@material-ui/lab';
/**
 * This component renders given list of comments of a meal
 * @author Beata Szczuka
 */
export class MealComments extends Component<MealCommentsProps> {
  state: MealCommentsState = initialStateMeal;
  componentDidMount() {
    this.props.fetchComments(this.props.page, this.props.mealId);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight)
      return;
    const { page, last, fetchComments } = this.props;
    if (!last && !this.props.pending) fetchComments(page, this.props.mealId);
    else if (last) window.removeEventListener('scroll', this.handleScroll);
  };

  addComment = () => {
    this.props.addMealComment(this.state.comment, this.state.rate, this.props.mealId);
    this.setState(initialStateMeal);
  };
  singleComment = (comment: CommentType, key: number) => (
    <div className="singleComment" key={key}>
      <div className="center">
        <FontAwesomeIcon icon={faUserAlt} size="3x" />
      </div>
      <div className="commentInfo">
        <div>
          <span className="author">{comment.author}</span>
          {this.removeButtonIfAuthor(comment.yourComment, comment.id)}
          <Rating value={comment.rate} precision={0.5} readOnly={true} />
        </div>
        <div>{comment.text}</div>
      </div>
    </div>
  );

  removeButtonIfAuthor(isOwner: boolean, commentId: number) {
    if (isOwner)
      return (
        <IconButton
          title="Remove your comment"
          className="trash"
          onClick={() => this.props.removeComment(commentId)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </IconButton>
      );
  }

  listComments = () => {
    if (this.props.comments.length === 0)
      return <div className="emptyInfo">{i18n._('There are no comments yet.')}</div>;
    const list: any = [];
    this.props.comments.forEach((comment, key) => {
      list.push(this.singleComment(comment, key));
    });
    return list;
  };

  displaySkeletons = () => {
    if (this.props.pending) {
      const skeletons: any = [];
      for (let i = 0; i < 5; i++) {
        skeletons.push(
          <div key={i} className="singleComment skeleton">
            <div className="center">
              <Skeleton variant="circle" width="40px" height="40px"></Skeleton>
            </div>
            <div className="commentInfo">
              <div>
                <Skeleton variant="text" width="50%"></Skeleton>
              </div>
              <Skeleton variant="text" component="div"></Skeleton>
            </div>
          </div>
        );
      }
      return skeletons;
    }
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
            <span title={!localStorage.getItem(JWT_TOKEN) ? i18n._('You must be logged in') : ''}>
              <Button
                className="addComment"
                onClick={() => this.addComment()}
                variant="contained"
                disabled={this.state.comment === '' || !localStorage.getItem(JWT_TOKEN)}
                color="primary"
              >
                {i18n._('Comment & rate')}
              </Button>
            </span>
          </span>
        </div>
        <div className="marginBottom">
          {this.listComments()}
          {this.displaySkeletons()}
        </div>
        {showAlert(pending, error, success, clearMealCommentsErrors, clearMealCommentsSuccess)}
        {this.showErrorAlert()}
      </div>
    );
  }

  showErrorAlert() {
    if (!this.state.pending && !!this.state.error) {
      return errorAlert({
        isOpen: !!this.state.error,
        message: this.state.error,
        onClose: () => this.setState({ error: null })
      });
    }
  }
}
const mapStateToProps = (state: MealCommentsState) => {
  return {
    error: state.mealCommentsReducer.error,
    success: state.mealCommentsReducer.success,
    pending: state.mealCommentsReducer.pending,
    comments: state.mealCommentsReducer.comments,
    page: state.mealCommentsReducer.page,
    last: state.mealCommentsReducer.last
  };
};

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      addMealComment,
      clearMealCommentsSuccess,
      clearMealCommentsErrors,
      removeComment,
      fetchComments
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealComments);
