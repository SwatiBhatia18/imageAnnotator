import React, { useRef } from "react"
import { Upload } from "lucide-react"
import { useDispatch } from "react-redux"
import { addImage } from "../redux/annotator_details/actions"
import { fileToBase64 } from "../utils/common"

const ImageUploader = () => {
  const fileInputRef = useRef(null)
  const dispatch = useDispatch()

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith("image/")) {
        const base64 = await fileToBase64(file)
        const id = `${Date.now()}-${i}`
        const imageObj = {
          id,
          name: file.name,
          src: base64, 
          file,
          comments: [],
        }
        dispatch(addImage(imageObj))
      }
    }
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
        aria-label="Upload images"
      />
      <button
        onClick={handleClick}
        className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        aria-label="Upload new image"
      >
        <Upload size={16} />
        <span>Upload Images</span>
      </button>
    </div>
  )
}

export default ImageUploader
