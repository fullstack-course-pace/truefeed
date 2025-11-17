import React, { useState, useRef } from 'react';
import { X, Image, Smile } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

const CreatePostModal = ({ onClose, onPost }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handleSubmit = () => {
    if (content.trim() || images.length > 0) {
      onPost({ content, images });
      onClose();
    }
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Create Post</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar src={user?.avatar} alt={user?.name} size="md" />
            <div>
              <h3 className="font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-500">Public</p>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${user?.name?.split(' ')[0]}?`}
            className="w-full resize-none border-none focus:outline-none text-gray-900 placeholder-gray-400 text-lg mb-4"
            rows="6"
            autoFocus
          />

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Add to Post */}
          <div className="border border-gray-200 rounded-xl p-4 mb-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">Add to your post</p>
            <div className="flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 p-3 text-green-600 hover:bg-green-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                title="Add photos"
              >
                <Image className="w-5 h-5" />
                <span className="text-sm font-medium">Photo/Video</span>
              </button>
              <button
                className="flex-1 p-3 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                title="Add emoji"
              >
                <Smile className="w-5 h-5" />
                <span className="text-sm font-medium">Feeling</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Post Button */}
          <Button
            onClick={handleSubmit}
            disabled={!content.trim() && images.length === 0}
            fullWidth
            size="lg"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;