import React, { useState, useRef } from 'react';
import { Camera, MapPin } from 'lucide-react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import Card from '../common/Card';

const ProfileSidebar = ({ user, isOwnProfile, onAvatarChange, onFollowToggle, onEditProfile }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onAvatarChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
    onFollowToggle?.(!isFollowing);
  };

  return (
    <div className="w-80 sticky top-4 h-fit">
      <Card>
        {/* Profile Picture */}
        <div className="flex flex-col items-center -mt-16 mb-4">
          <div
            className="relative group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Change Avatar Button */}
            {isOwnProfile && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity ${
                  isHovering ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Camera className="w-6 h-6 text-white" />
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

          {/* User Info */}
          <h2 className="text-2xl font-bold text-gray-900 mt-3">{user.name}</h2>
          <p className="text-sm text-gray-500 mb-4">{user.role}</p>

          {/* Follow/Edit Button */}
          {isOwnProfile ? (
            <Button variant="outline" fullWidth className="mb-4" onClick={onEditProfile}>
              Edit Profile
            </Button>
          ) : (
            <Button
              onClick={handleFollowClick}
              variant={isFollowing ? 'secondary' : 'primary'}
              fullWidth
              className="mb-4"
            >
              {isFollowing ? 'Following' : 'Follow'}
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{user.stats.posts}</div>
            <div className="text-xs text-gray-500">Collections</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{user.stats.followers}</div>
            <div className="text-xs text-gray-500">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{user.stats.likes}</div>
            <div className="text-xs text-gray-500">Likes</div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4 space-y-1">
          {['Collections', 'Team', 'Work in progress', 'Blog', 'Archives'].map((item) => (
            <button
              key={item}
              className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Location */}
        {user.location && (
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProfileSidebar;