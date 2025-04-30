import React from 'react';
import ImageUploader from './components/ImageUploader';
import ImageGallery from './components/ImageGallery';
import ImageCanvas from './components/ImageCanvas';
import CommentSidebar from './components/CommentSidebar';
import { MessageSquareMore } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <div className="flex items-center gap-2">
            <MessageSquareMore className="text-blue-500" size={24} />
            <h1 className="text-xl font-semibold">Image Annotator</h1>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col">
        {/* Upload section */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium mb-1">Image Annotations</h2>
            <p className="text-sm text-gray-500">
              Upload images and add comments by clicking anywhere on the image
            </p>
          </div>
          <ImageUploader />
        </div>
        
        {/* Image gallery */}
        <div className="mb-6">
          <ImageGallery />
        </div>
        
        {/* Canvas and sidebar */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4">
          {/* Canvas */}
          <div className="flex-1 flex">
            <ImageCanvas />
          </div>
          
          {/* Sidebar */}
          <CommentSidebar />
        </div>
      </main>
    
    </div>
  );
}

export default App;