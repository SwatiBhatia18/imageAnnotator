import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CommentMarker from './CommentMarker';
import CommentEditor from './CommentEditor';
import { startAddingComment } from '../redux/annotator_details/actions';

const ImageCanvas = () => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const images = useSelector((state) => state.anotator_details.images);
  const selectedImageId = useSelector((state) => state.anotator_details.selectedImageId);
  const isAddingComment = useSelector((state) => state.anotator_details.isAddingComment);
  const commentPosition = useSelector((state) => state.anotator_details.commentPosition);
  const activeCommentId = useSelector((state) => state.anotator_details.activeCommentId);

  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });
  
  
  const selectedImage = images.find((img) => img.id === selectedImageId);
 
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setCanvasDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };

    handleResize()
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCanvasClick = (e) => {
    if (!selectedImageId || !imageRef.current) return;

    if (e.target.closest('.comment-marker') || e.target.closest('.comment-editor')) return;

    const imageRect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - imageRect.left) / imageRect.width) * 100;
    const y = ((e.clientY - imageRect.top) / imageRect.height) * 100;

    const boundedX = Math.min(Math.max(x, 0), 100);
    const boundedY = Math.min(Math.max(y, 0), 100);

    dispatch(startAddingComment({ x: boundedX, y: boundedY }));
  };

  if (!selectedImage) {
    return (
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-md"
      >
        <p className="text-gray-400">No image selected. Please upload an image.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 relative bg-gray-50 border border-gray-200 border-solid rounded-md"
    >
      <div className="relative w-full h-full" onClick={handleCanvasClick}>
        <img
          ref={imageRef}
          src={selectedImage.src}
          alt="Selected"
          className="w-full h-full object-contain"
        />

        {selectedImage?.comments?.map((comment, index) => (
          <CommentMarker
            key={comment.id}
            comment={comment}
            index={index + 1}
            isActive={activeCommentId === comment.id}
          />
        ))}

        {isAddingComment && commentPosition && (
          <div
            className="absolute comment-editor z-50"
            style={{
              left: `${commentPosition.x}%`,
              top: `${commentPosition.y}%`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute w-6 h-6 bg-blue-500 rounded-full -ml-3 -mt-3">
              <span className="flex items-center justify-center w-full h-full text-xs text-white font-medium">
                +
              </span>
            </div>
            <div className="absolute mt-4 ml-2">
              <CommentEditor isNewComment />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCanvas;
