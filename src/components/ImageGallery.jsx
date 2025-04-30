import React from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { selectImage, removeImage } from "../redux/annotator_details/actions"

const ImageGallery = () => {
  const dispatch = useDispatch()
  const images = useSelector((state) => state.anotator_details.images)
  const selectedImageId = useSelector(
    (state) => state.anotator_details.selectedImageId
  )

  if (images?.length === 0) return null

  const handlePrevious = () => {
    const currentIndex = images.findIndex((img) => img.id === selectedImageId)
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images?.length - 1
    dispatch(selectImage(images[newIndex].id))
  }

  const handleNext = () => {
    const currentIndex = images.findIndex((img) => img.id === selectedImageId)
    const newIndex = currentIndex < images?.length - 1 ? currentIndex + 1 : 0
    dispatch(selectImage(images[newIndex].id))
  }

  const handleRemove = (id, e) => {
    e.stopPropagation()
    dispatch(removeImage(id))
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {images?.length} {images?.length === 1 ? "image" : "images"}
        </div>

        {images?.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
      <div className="flex overflow-x-auto gap-2 pb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={`relative cursor-pointer flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden transition-all ${
              image.id === selectedImageId
                ? "border-blue-500 shadow-md"
                : "border-gray-200"
            }`}
            onClick={() => dispatch(selectImage(image.id))}
          >
            <img
              src={image.src}
              alt="Uploaded"
              className="w-full h-full object-cover"
            />
            <button
              onClick={(e) => handleRemove(image.id, e)}
              className="absolute top-0 right-0 bg-black/50 p-0.5 rounded-bl-md text-white hover:bg-black/70 transition-colors"
              aria-label="Remove image"
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery
