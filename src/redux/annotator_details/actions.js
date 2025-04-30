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

export const startAddingComment = (payload) => ({
  type: START_ADDING_COMMENT,
  payload,
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

export const deleteComment = (payload) => ({
  type: DELETE_COMMENT,
  payload,
})

export const addReply = (payload) => ({
  type: ADD_REPLY,
  payload,
})

export const updateReply = (payload) => ({
  type: UPDATE_REPLY,
  payload,
})

export const deleteReply = (payload) => {
  return {
    type: DELETE_REPLY,
    payload,
  }
}

export const setActiveComment = (id) => ({
  type: SET_ACTIVE_COMMENT,
  payload: { id },
})

export const addImage = (payload) => ({
  type: ADD_IMAGE,
  payload,
})

export const removeImage = (id) => ({
  type: REMOVE_IMAGE,
  payload: { id },
})

export const selectImage = (id) => ({
  type: SELECT_IMAGE,
  payload: { id },
})
