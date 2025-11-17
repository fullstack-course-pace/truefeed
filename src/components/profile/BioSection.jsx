import React, { useState } from 'react';
import { Edit2, ExternalLink } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const BioSection = ({ user, isOwnProfile, onBioUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState(user.bio);
  const [website, setWebsite] = useState(user.website);

  const handleSave = () => {
    onBioUpdate({ bio, website });
    setIsEditing(false);
  };

  return (
    <Card>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">BIOGRAPHY</h3>
        {isOwnProfile && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Bio Content */}
      {isEditing ? (
        <div className="space-y-4">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
          />
          <input
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Website URL"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm">
              Save
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant="secondary"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">{bio}</p>

          {/* Website */}
          {website && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">
                WEBSITE
              </h4>

              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-purple-600 hover:text-purple-700 flex items-center gap-1 break-all"
              >
                {website}
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>
          )}

          {/* Skills */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
              SKILLS
            </h4>
            <div className="flex flex-wrap gap-2">
              {user.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-purple-700 text-xs font-medium rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default BioSection;
