import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveComment } from "../redux/annotator_details/actions"
import CommentEditor from "./CommentEditor"

const CommentMarker = ({ comment, index, isActive }) => {
  const dispatch = useDispatch()

  const handleMarkerClick = (e) => {
    e.stopPropagation()
    dispatch(setActiveComment(isActive ? null : comment.id))
  }

  return (
    <div
      className="absolute comment-marker"
      style={{
        left: `${comment.x}%`,
        top: `${comment.y}%`,
        zIndex: isActive ? 30 : 20,
      }}
    >
      <button
        className={`absolute w-6 h-6 rounded-full -ml-3 -mt-3 flex items-center justify-center text-xs font-medium transition-all ${
          isActive
            ? "bg-blue-600 text-white scale-110"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={handleMarkerClick}
        aria-label={`Comment ${index}`}
      >
        {index}
      </button>
      {isActive && (
        <div className="absolute mt-4 ml-2">
          <CommentEditor
            commentId={comment.id}
            initialContent={comment.content}
            replies={comment.replies}
          />
        </div>
      )}
    </div>
  )
}

export default CommentMarker
