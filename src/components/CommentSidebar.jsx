import React from "react"
import { MessageSquare } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { setActiveComment } from "../redux/annotator_details/actions"
import { formatDate } from "../utils/common"

const CommentSidebar = () => {
  const dispatch = useDispatch()

  const images = useSelector((state) => state.anotator_details.images)
  const selectedImageId = useSelector(
    (state) => state.anotator_details.selectedImageId
  )
  const activeCommentId = useSelector(
    (state) => state.anotator_details.activeCommentId
  )

  const selectedImage = images.find((img) => img.id === selectedImageId)

  if (!selectedImage || selectedImage?.comments?.length === 0) {
    return (
      <div className="w-full lg:w-64 p-4 border-l border-gray-200 bg-white">
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <MessageSquare size={18} />
          <h2 className="font-medium">Comments</h2>
        </div>
        <p className="text-sm text-gray-400">
          {!selectedImage
            ? "Select an image to view comments"
            : "No comments yet. Click on the image to add a comment."}
        </p>
      </div>
    )
  }

  return (
    <div className="w-full lg:w-64 p-4 border-l border-gray-200 border-solid bg-white overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageSquare size={18} className="text-blue-500" />
          <h2 className="font-medium">
            Comments ({selectedImage?.comments?.length})
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {selectedImage?.comments?.map((comment, index) => (
          <div
            key={comment.id}
            className={`p-3 rounded-md cursor-pointer transition-all ${
              activeCommentId === comment.id
                ? "bg-blue-50 border-l-4 border-blue-500"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => dispatch(setActiveComment(comment.id))}
          >
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{comment.content}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-400">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                {comment?.replies?.length > 0 && (
                    <span className="text-xs text-gray-500">
                      {comment?.replies?.length}{" "}
                      {comment?.replies?.length === 1 ? "reply" : "replies"}
                    </span>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommentSidebar
