import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import Avatar from '../common/Avatar';
import Card from '../common/Card';
import clsx from 'clsx';

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <Card>
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar src={post.avatar} alt={post.user} size="md" online />
          <div>
            <h4 className="font-semibold text-gray-900">{post.user}</h4>
            <p className="text-sm text-gray-500">{post.time}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Post Content */}
      {post.content && (
        <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>
      )}

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className={clsx(
          'grid gap-2 mb-4 rounded-xl overflow-hidden',
          post.images.length === 1 && 'grid-cols-1',
          post.images.length === 2 && 'grid-cols-2',
          post.images.length >= 3 && 'grid-cols-2'
        )}>
          {post.images.map((img, index) => (
            <div
              key={index}
              className={clsx(
                'relative overflow-hidden',
                post.images.length === 3 && index === 0 && 'col-span-2',
                'aspect-square'
              )}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
        <button
          onClick={handleLike}
          className={clsx(
            'flex items-center gap-2 transition-colors',
            liked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
          )}
        >
          <Heart className={clsx('w-5 h-5', liked && 'fill-current')} />
          <span className="text-sm font-medium">{likes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">{post.comments || 0}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
          <Share2 className="w-5 h-5" />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>
    </Card>
  );
};

export default Post;