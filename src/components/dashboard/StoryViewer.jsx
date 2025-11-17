import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Avatar from '../common/Avatar';

const StoryViewer = ({ stories, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);

  const currentStory = stories[currentIndex];

  // Auto-advance progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 2; // 5 seconds total (100 / 2 = 50 intervals at 100ms each)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Reset progress when story changes
  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleProgressClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="absolute left-4 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
      )}

      {currentIndex < stories.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Story Content */}
      <div className="relative w-full max-w-lg h-full max-h-[90vh] bg-black rounded-2xl overflow-hidden">
        {/* Progress Bars */}
        <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-10">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => handleProgressClick(index)}
              className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                }}
              />
            </button>
          ))}
        </div>

        {/* User Info */}
        <div className="absolute top-4 left-4 right-4 flex items-center gap-3 z-10 mt-4">
          <Avatar src={currentStory.avatar} alt={currentStory.user} size="md" />
          <div className="flex-1">
            <h3 className="text-white font-semibold drop-shadow-lg">
              {currentStory.user}
            </h3>
            <p className="text-white/80 text-xs drop-shadow-lg">2 hours ago</p>
          </div>
        </div>

        {/* Story Image */}
        <img
          src={currentStory.image}
          alt={currentStory.user}
          className="w-full h-full object-cover"
        />

        {/* Click Zones for Navigation */}
        <div className="absolute inset-0 flex">
          <div
            onClick={handlePrevious}
            className="flex-1 cursor-pointer"
          />
          <div
            onClick={handleNext}
            className="flex-1 cursor-pointer"
          />
        </div>
      </div>

      {/* Story Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white text-sm">
        {currentIndex + 1} / {stories.length}
      </div>
    </div>
  );
};

export default StoryViewer;