import {
  START_ADDING_COMMENT,
  CANCEL_ADDING_COMMENT,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  ADD_REPLY,
  UPDATE_REPLY,
  DELETE_REPLY,
  SET_ACTIVE_COMMENT,
  ADD_IMAGE,
  REMOVE_IMAGE,
  SELECT_IMAGE,
} from "./actiontypes"

export const startAddingComment = ({ x, y }) => ({
  type: START_ADDING_COMMENT,
  payload: { x, y },
})

export const cancelAddingComment = () => ({
  type: CANCEL_ADDING_COMMENT,
})

export const addComment = (content) => ({
  type: ADD_COMMENT,
  payload: { content },
})

export const updateComment = ({ id, imageId, content }) => ({
  type: UPDATE_COMMENT,
  payload: { id, imageId, content },
})

export const deleteComment = ({ id, imageId }) => ({
  type: DELETE_COMMENT,
  payload: { id, imageId },
});

export const addReply = ({ id, imageId, commentId, content }) => ({
  type: ADD_REPLY,
  payload: { id, imageId, commentId, content },
})

export const updateReply = ({ replyId, imageId, commentId, content }) => ({
  type: UPDATE_REPLY,
  payload: { replyId, imageId, commentId, content },
})

export const deleteReply = ({ replyId, selectedImageId, commentId }) => { 
  return {
    type: DELETE_REPLY,
    payload: { replyId, selectedImageId, commentId },
  };
};

export const setActiveComment = (id) => ({
  type: SET_ACTIVE_COMMENT,
  payload: { id },
})

export const addImage = ({ id, file, src, comments }) => ({
  type: ADD_IMAGE,
  payload: { id, file, src, comments },
});

export const removeImage = (id) => ({
  type: REMOVE_IMAGE,
  payload: { id },
})

export const selectImage = (id) => ({
  type: SELECT_IMAGE,
  payload: { id },
})
