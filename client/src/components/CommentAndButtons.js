import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addReply,
  editComment,
  deleteComment,
} from '../reducers/postCommentsReducer';
import DeleteDialog from './DeleteDialog';

import { TextField, Button, Typography } from '@material-ui/core';
import { useCommentAndBtnsStyles } from '../styles/muiStyles';
import ReplyIcon from '@material-ui/icons/Reply';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';

const CommentAndButtons = ({ isMobile, comment, postId, user }) => {
  const [replyOpen, setReplyOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [reply, setReply] = useState('');
  const [edit, setEdit] = useState(comment.commentBody);
  const dispatch = useDispatch();
  const classes = useCommentAndBtnsStyles();

  const handlePostReply = async () => {
    try {
      dispatch(addReply(postId, comment.id, reply));
      setReplyOpen(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEditComment = () => {
    try {
      dispatch(editComment(postId, comment.id, edit));
      setEditOpen(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCommentDelete = () => {
    try {
      dispatch(deleteComment(postId, comment.id));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      {!editOpen ? (
        <Typography variant="body2">{comment.commentBody}</Typography>
      ) : (
        <div className={classes.inputDiv}>
          <TextField
            multiline
            required
            fullWidth
            rows={2}
            rowsMax={Infinity}
            value={edit}
            onChange={(e) => setEdit(e.target.value)}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
          />
          <div className={classes.submitBtns}>
            <Button
              onClick={() => setEditOpen(false)}
              color="primary"
              variant="outlined"
              size="small"
              className={classes.cancelBtn}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditComment}
              color="primary"
              variant="contained"
              startIcon={<SendIcon />}
              size="small"
            >
              Update
            </Button>
          </div>
        </div>
      )}
      <div className={classes.btnBar}>
        {user && (
          <Button
            size="small"
            color="inherit"
            startIcon={<ReplyIcon />}
            className={classes.btnStyle}
            onClick={() => setReplyOpen((prevState) => !prevState)}
          >
            Reply
          </Button>
        )}
        {user && user.id === comment.commentedBy.id && (
          <>
            <Button
              size="small"
              color="inherit"
              startIcon={<EditIcon />}
              className={classes.btnStyle}
              onClick={() => setEditOpen((prevState) => !prevState)}
            >
              Edit
            </Button>
            <DeleteDialog type="comment" handleDelete={handleCommentDelete} />
          </>
        )}
      </div>
      {replyOpen && (
        <div className={classes.inputDiv}>
          <TextField
            placeholder={`Reply to ${comment.commentedBy.username}'s comment`}
            multiline
            required
            fullWidth
            rows={4}
            rowsMax={Infinity}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
          />
          <div className={classes.submitBtns}>
            <Button
              onClick={() => setReplyOpen(false)}
              color="primary"
              variant="outlined"
              size="small"
              className={classes.cancelBtn}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePostReply}
              color="primary"
              variant="contained"
              startIcon={<SendIcon />}
              size="small"
            >
              Reply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentAndButtons;