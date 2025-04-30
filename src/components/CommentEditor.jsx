import React, { useState, useRef, useEffect } from "react"
import { X, Check, Edit, Trash2, Send } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import {
  addComment,
  updateComment,
  deleteComment,
  cancelAddingComment,
  addReply,
  updateReply,
  deleteReply,
  setActiveComment,
} from "../redux/annotator_details/actions"

const CommentEditor = ({
  commentId,
  initialContent = "",
  replies = [],
  isNewComment = false,
}) => {
  const selectedImageId = useSelector(
    (state) => state.anotator_details.selectedImageId
  )
  const [content, setContent] = useState(initialContent)
  const [replyContent, setReplyContent] = useState("")
  const [isEditing, setIsEditing] = useState(isNewComment)
  const [editingReplyId, setEditingReplyId] = useState(null)

  const textareaRef = useRef(null)
  const replyTextareaRef = useRef(null)

  const dispatch = useDispatch()
  const activeComment = useSelector(
    (state) => state.anotator_details.activeComment
  )

  useEffect(() => {
    if (isNewComment) {
      setIsEditing(true)
    } else if (activeComment && activeComment.id === commentId) {
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }, [isNewComment, activeComment, commentId])

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [isEditing])

  useEffect(() => {
    if (editingReplyId && replyTextareaRef.current) {
      replyTextareaRef.current.focus()
    }
  }, [editingReplyId])

  const autoResizeTextarea = (textarea) => {
    if (!textarea) return
    textarea.style.height = "auto"
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const handleContentChange = (e) => {
    setContent(e.target.value)
    autoResizeTextarea(e.target)
  }

  const handleReplyContentChange = (e) => {
    setReplyContent(e.target.value)
    autoResizeTextarea(e.target)
  }

  const handleSaveComment = () => {
    if (!content.trim()) return

    if (isNewComment) {
      dispatch(addComment(content))
    } else if (commentId) {
      dispatch(updateComment(commentId, content))
      setIsEditing(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSaveComment()
    }
  }

  const handleCancelComment = () => {
    if (isNewComment) {
      dispatch(cancelAddingComment())
    } else {
      setIsEditing(false)
      setContent(initialContent || "")
    }
  }

  const handleClose = () => {
    if (commentId) {
      dispatch(setActiveComment(null))
    } else {
      dispatch(cancelAddingComment())
    }
  }

  const handleDeleteComment = () => {
    if (commentId) {
      dispatch(deleteComment({ id: commentId, imageId: selectedImageId }))
    }
  }

  const handleEditReply = (reply) => {
    setEditingReplyId(reply.id)
    setReplyContent(reply.content)
  }

  const handleSaveReply = () => {
    if (!replyContent.trim() || !commentId) return

    if (editingReplyId) {
      dispatch(
        updateReply({
          replyId: editingReplyId,
          imageId: selectedImageId,
          commentId,
          content: replyContent,
        })
      )
      setEditingReplyId(null)
    } else {
      const newReplyId = Date.now().toString()
      dispatch(
        addReply({
          id: newReplyId,
          imageId: selectedImageId,
          commentId,
          content: replyContent,
        })
      )
    }

    setReplyContent("")
  }

  const handleCancelReply = () => {
    setEditingReplyId(null)
    setReplyContent("")
  }

  const handleDeleteReply = (replyId) => {
    if (commentId) {
      dispatch(deleteReply({ commentId, selectedImageId, replyId }))
    }
  }

  const formatDate = (date) => {
    if (!date) return ""

    try {
      const d = typeof date === "string" ? new Date(date) : date

      if (isNaN(d.getTime())) {
        return "Invalid date"
      }

      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    } catch (error) {
      return ""
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg w-64 overflow-hidden animate-fadeIn">
      {/* Header */}
      <div className="bg-blue-500 text-white px-3 py-2 flex justify-between items-center">
        <h3 className="text-sm font-medium">
          {isNewComment
            ? "New Comment"
            : "Comment"}
        </h3>
        <button
          onClick={handleClose}
          className="text-white/80 hover:text-white"
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      {/* Comment content */}
      <div className="p-3">
        {isEditing ? (
          <div>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleContentChange}
              onKeyPress={handleKeyPress}
              className="w-full p-2 border border-gray-300 border-solid rounded-md text-sm resize-none min-h-[60px]"
              placeholder="Type your comment here..."
              onInput={(e) => autoResizeTextarea(e.target)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={handleCancelComment}
                className="px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded"
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveComment}
                className={`px-2 py-1 text-xs bg-blue-500 text-white rounded flex items-center gap-1 ${
                  content.trim()
                    ? "hover:bg-blue-600"
                    : "opacity-50 cursor-not-allowed"
                }`}
                aria-label="Save"
                disabled={!content.trim()}
              >
                <Check size={12} />
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-sm mb-2">{content}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {initialContent && formatDate(new Date())}
              </span>
              {!isNewComment && commentId && (
                <div className="flex gap-1">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    aria-label="Edit comment"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={handleDeleteComment}
                    className="p-1 text-gray-400 hover:text-red-500 rounded"
                    aria-label="Delete comment"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Replies section */}
      {!isNewComment && commentId && !isEditing && (
        <div>
          <hr className="border-gray-200 border-[1px] border-solid" />

          {/* Existing replies */}
          {replies.length > 0 && (
            <div className="px-3 py-2 max-h-40 overflow-y-auto">
              {replies.map((reply) => (
                <div key={reply.id} className="mb-3 last:mb-0">
                  {editingReplyId === reply.id ? (
                    <div>
                      <textarea
                        ref={replyTextareaRef}
                        value={replyContent}
                        onChange={handleReplyContentChange}
                        className="w-full p-2 border border-gray-300 border-solid rounded-md text-sm resize-none min-h-[40px]"
                        placeholder="Edit your reply..."
                        onInput={(e) => autoResizeTextarea(e.target)}
                      />
                      <div className="flex justify-end gap-2 mt-1">
                        <button
                          onClick={handleCancelReply}
                          className="px-1.5 py-0.5 text-xs text-gray-500 hover:bg-gray-100 rounded"
                          aria-label="Cancel"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveReply}
                          className={`px-1.5 py-0.5 text-xs bg-blue-500 text-white rounded flex items-center gap-1 ${
                            replyContent.trim()
                              ? "hover:bg-blue-600"
                              : "opacity-50 cursor-not-allowed"
                          }`}
                          aria-label="Save reply"
                          disabled={!replyContent.trim()}
                        >
                          <Check size={10} />
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs mb-1">{reply.content}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                          {formatDate(reply.createdAt)}
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleEditReply(reply)}
                            className="p-0.5 text-gray-400 hover:text-gray-600 rounded"
                            aria-label="Edit reply"
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            onClick={() => handleDeleteReply(reply.id)}
                            className="p-0.5 text-gray-400 hover:text-red-500 rounded"
                            aria-label="Delete reply"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add new reply */}
          {!editingReplyId && (
            <div className="px-3 py-2 bg-gray-50">
              <div className="flex gap-2">
                <textarea
                  value={replyContent}
                  onChange={handleReplyContentChange}
                  className="flex-1 p-1.5 border border-gray-300 border-solid rounded-md text-xs resize-none min-h-[32px]"
                  placeholder="Add a reply..."
                  onInput={(e) => autoResizeTextarea(e.target)}
                />
                <button
                  onClick={handleSaveReply}
                  className={`self-end p-1.5 bg-blue-500 text-white rounded-md flex-shrink-0 ${
                    replyContent.trim()
                      ? "hover:bg-blue-600"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  aria-label="Send reply"
                  disabled={!replyContent.trim()}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CommentEditor
