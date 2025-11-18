import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import Avatar from '../common/Avatar';
import Shuffle from '../common/Shuffle';
import UserCredibilityTooltip from './UserCredibilityTooltip';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [saved, setSaved] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  
  const usernameRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Mock credibility score (0-100) - will come from backend later
  const credibilityScore = Math.floor(Math.random() * 100);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (usernameRef.current) {
      const rect = usernameRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top,
        left: rect.left
      });
    }

    // Show tooltip after 5 seconds
    hoverTimeoutRef.current = setTimeout(() => {
      setShowTooltip(true);
    }, 5000);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setShowTooltip(false);
  };

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={post.avatar} alt={post.user} size="md" />
          <div>
            <div
              ref={usernameRef}
              className="inline-block relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Shuffle
                text={post.user}
                tag="h3"
                className="font-semibold text-gray-900 text-sm cursor-pointer"
                style={{ 
                  fontSize: '0.875rem',
                  fontFamily: 'inherit',
                  textTransform: 'none',
                  lineHeight: '1.25rem'
                }}
                shuffleDirection="right"
                duration={0.3}
                animationMode="evenodd"
                shuffleTimes={1}
                ease="power3.out"
                stagger={0.02}
                threshold={0.1}
                triggerOnce={false}
                triggerOnHover={true}
                respectReducedMotion={true}
              />
            </div>
            <p className="text-xs text-gray-500">{post.time}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Post Content */}
      {post.content && (
        <div className="px-4 pb-3">
          <p className="text-gray-800 text-sm leading-relaxed">{post.content}</p>
        </div>
      )}

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className={`grid gap-1 ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
          {post.images.map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden">
              <img
                src={image}
                alt={`Post ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 transition-all ${
                liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart
                className={`w-6 h-6 transition-all ${liked ? 'fill-red-500 scale-110' : ''}`}
              />
              <span className="text-sm font-medium">{likeCount}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors">
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
            <button className="text-gray-600 hover:text-purple-600 transition-colors">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={handleSave}
            className={`transition-colors ${
              saved ? 'text-purple-600' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Bookmark className={`w-6 h-6 ${saved ? 'fill-purple-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Credibility Tooltip */}
      <UserCredibilityTooltip
        credibilityScore={credibilityScore}
        visible={showTooltip}
        position={tooltipPosition}
      />
    </div>
  );
};

export default Post;