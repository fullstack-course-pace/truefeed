import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import Button from '../common/Button';

const BannerHeader = ({ bannerImage, isOwnProfile, onBannerChange }) => {
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onBannerChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="relative h-80 rounded-2xl overflow-hidden group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Banner Image */}
      <img
        src={bannerImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200'}
        alt="Profile Banner"
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Banner Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-7xl font-bold text-white tracking-wider drop-shadow-2xl">
          MOUNTAINS
        </h1>
        <Button
          size="sm"
          className="mt-4 bg-gradient-to-r from-pink-500 to-purple-600"
        >
          Featured Collection
        </Button>
      </div>

      {/* Change Banner Button (Only for own profile) */}
      {isOwnProfile && (
        <div
          className={`absolute top-4 right-4 transition-opacity duration-200 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-all backdrop-blur-sm"
          >
            <Camera className="w-4 h-4" />
            <span className="text-sm font-medium">Change Cover</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default BannerHeader;