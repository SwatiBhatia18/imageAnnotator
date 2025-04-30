import {
  ADD_IMAGE,
  REMOVE_IMAGE,
  SELECT_IMAGE,
  START_ADDING_COMMENT,
  CANCEL_ADDING_COMMENT,
  ADD_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  ADD_REPLY,
  UPDATE_REPLY,
  DELETE_REPLY,
  SET_ACTIVE_COMMENT,
} from "./actiontypes"

const initialState = {
  images: [],
  selectedImageId: null,
  isAddingComment: false,
  commentPosition: null,
  activeCommentId: null,
}

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_IMAGE:
      return {
        ...state,
        images: [...state.images, action.payload],
        selectedImageId: state.selectedImageId || action.payload.id,
      }

    case REMOVE_IMAGE: {
      const newImages = state.images.filter(
        (img) => img.id !== action.payload.id
      )
      const newSelectedId =
        state.selectedImageId === action.payload.id
          ? newImages[0]?.id || null
          : state.selectedImageId

      return {
        ...state,
        images: newImages,
        selectedImageId: newSelectedId,
      }
    }

    case SELECT_IMAGE:
      return {
        ...state,
        selectedImageId: action.payload.id,
      }

    case START_ADDING_COMMENT:
      return {
        ...state,
        isAddingComment: true,
        commentPosition: { x: action.payload.x, y: action.payload.y },
      }

    case CANCEL_ADDING_COMMENT:
      return {
        ...state,
        isAddingComment: false,
        commentPosition: null,
      }

    case ADD_COMMENT: {
      if (!state.selectedImageId || !state.commentPosition) return state

      const newComment = {
        id: Date.now(),
        x: state.commentPosition.x,
        y: state.commentPosition.y,
        content: action.payload.content,
        createdAt: new Date(),
        updatedAt: new Date(),
        replies: [],
      }

      const updatedImages = state.images.map((img) => {
        if (img.id === state.selectedImageId) {
          return {
            ...img,
            comments: [...(img.comments || []), newComment],
          }
        }
        return img
      })

      return {
        ...state,
        images: updatedImages,
        isAddingComment: false,
        commentPosition: null,
        activeCommentId: newComment.id,
      }
    }

    case UPDATE_COMMENT: {
      const updatedImages = state.images.map((img) => {
        if (img.id === action.payload.imageId) {
          const updatedComments = (img.comments || []).map((comment) =>
            comment.id === action.payload.id
              ? {
                  ...comment,
                  content: action.payload.content,
                  updatedAt: new Date(),
                }
              : comment
          )
          return { ...img, comments: updatedComments }
        }
        return img
      })

      return {
        ...state,
        images: updatedImages,
      }
    }

    case DELETE_COMMENT: {
      const updatedImages = state.images.map((img) => {
        if (img.id === action.payload.imageId) {
       
          const filteredComments = img.comments
            ? img.comments.filter((comment) => comment.id !== action.payload.id)
            : []

          
          return { ...img, comments: filteredComments }
        }
        return img 
      })

      return {
        ...state,
        images: updatedImages,
      }
    }

    case ADD_REPLY: {
      const updatedImages = state.images.map((img) => {

        if (img.id === action.payload.imageId) {
          const updatedComments = (img.comments || []).map((comment) => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: action.payload.id,
                    content: action.payload.content,
                  },
                ],
              }
            }
            return comment
          })
          return { ...img, comments: updatedComments }
        }
        return img
      })

      return {
        ...state,
        images: updatedImages,
      }
    }

    case UPDATE_REPLY: {
      const updatedImages = state.images.map((img) => {
        if (img.id === action.payload.imageId) {
          const updatedComments = (img.comments || []).map((comment) => {
            if (comment.id === action.payload.commentId) {
              const updatedReplies = comment.replies.map((reply) =>
                reply.id === action.payload.replyId
                  ? { ...reply, content: action.payload.content }
                  : reply
              )
              return { ...comment, replies: updatedReplies }
            }
            return comment
          })
          return { ...img, comments: updatedComments }
        }
        return img
      })

      return {
        ...state,
        images: updatedImages,
      }
    }

    case DELETE_REPLY: {
      const updatedImages = state.images.map((img) => {
    
        if (img.id === action.payload.selectedImageId) {
          const updatedComments = (img.comments || []).map((comment) => {
            if (comment.id === action.payload.commentId) {
              const filteredReplies = comment.replies.filter(
                (reply) => reply.id !== action.payload.replyId
              )
              return { ...comment, replies: filteredReplies }
            }
            return comment
          })
          return { ...img, comments: updatedComments }
        }
        return img
      })

      return {
        ...state,
        images: updatedImages,
      }
    }

    case SET_ACTIVE_COMMENT:
      return {
        ...state,
        activeCommentId: action.payload.id,
        isAddingComment: false,
        commentPosition: null,
      }

    default:
      return state
  }
}

export default Reducer
