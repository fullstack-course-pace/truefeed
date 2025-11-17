import React, { useState, useRef } from 'react';
import { X, Camera, Plus, Trash2 } from 'lucide-react';
import Button from '../common/Button';

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    role: user.role || '',
    bio: user.bio || '',
    website: user.website || '',
    location: user.location || '',
    avatar: user.avatar || '',
    skills: user.skills || [],
  });

  const [newSkill, setNewSkill] = useState('');
  const [previewImage, setPreviewImage] = useState(user.avatar);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.target.name !== 'bio') {
      e.preventDefault();
      if (e.target.id === 'newSkill') {
        handleAddSkill();
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Change Photo
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  JPG, PNG or GIF. Max size 5MB
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-900 mb-2">
              Role / Title
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. Art Director, Designer"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-semibold text-gray-900 mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Tell us about yourself..."
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.bio.length} / 500 characters
            </p>
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-semibold text-gray-900 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="e.g. New York, USA"
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-2">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://yourwebsite.com"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Skills
            </label>
            
            {/* Existing Skills */}
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 text-sm font-medium rounded-full flex items-center gap-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Skill */}
            <div className="flex gap-2">
              <input
                type="text"
                id="newSkill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="Add a skill (e.g. Adobe Photoshop)"
              />
              <Button
                type="button"
                onClick={handleAddSkill}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Press Enter or click Add to include a new skill
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <Button type="submit" fullWidth>
              Save Changes
            </Button>
            <Button type="button" variant="secondary" onClick={onClose} fullWidth>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;