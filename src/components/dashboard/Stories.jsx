import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AddStoryModal from './AddStoryModal';
import StoryViewer from './StoryViewer';
import clsx from 'clsx';

const Stories = ({ stories, onAddStory }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewer, setShowViewer] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  const handleAddStory = (image) => {
    onAddStory(image);
    setShowAddModal(false);
  };

  const handleStoryClick = (index) => {
    setSelectedStoryIndex(index);
    setShowViewer(true);
  };

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide -mx-2 px-2">
        {/* Add Story Card */}
        <button
          onClick={() => setShowAddModal(true)}
          className="flex-shrink-0 w-28 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 hover:scale-105 transition-transform cursor-pointer group"
        >
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <Plus className="w-7 h-7 text-purple-600" />
          </div>
          <span className="text-xs font-semibold text-gray-700">Add Story</span>
        </button>

        {/* Story Cards */}
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => handleStoryClick(index)}
            className="flex-shrink-0 w-28 h-40 rounded-2xl overflow-hidden relative group hover:scale-105 transition-transform cursor-pointer"
          >
            <img
              src={story.image}
              alt={story.user}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3">
              <div className="w-12 h-12 rounded-full border-3 border-purple-500 p-0.5 bg-white">
                <img
                  src={story.avatar}
                  alt={story.user}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <p className="text-white text-xs font-semibold truncate drop-shadow-lg">
                {story.user}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Add Story Modal */}
      {showAddModal && (
        <AddStoryModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddStory}
        />
      )}

      {/* Story Viewer */}
      {showViewer && (
        <StoryViewer
          stories={stories}
          initialIndex={selectedStoryIndex}
          onClose={() => setShowViewer(false)}
        />
      )}
    </>
  );
};

export default Stories;