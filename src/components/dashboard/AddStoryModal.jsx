import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import Button from '../common/Button';

const AddStoryModal = ({ onClose, onAdd }) => {
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (preview) {
      onAdd(preview);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Add Story</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          {preview ? (
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={() => setPreview(null)}
                className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-purple-500 hover:bg-purple-50 transition-all"
            >
              <Upload className="w-12 h-12 text-gray-400" />
              <span className="text-sm text-gray-600">Click to upload image</span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!preview} fullWidth>
            Add Story
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddStoryModal;