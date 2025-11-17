import React, { useState } from 'react';
import { Smile } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import Card from '../common/Card';

const CreatePost = ({ onPost }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onPost({ content, images: [] });
      setContent('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Card>
      <div className="flex gap-3">
        <Avatar src={user?.avatar} alt={user?.name} size="md" online={null} />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`What's new, ${user?.name?.split(' ')[0]}?`}
            className="w-full resize-none border-none focus:outline-none text-gray-900 placeholder-gray-400 mb-3"
            rows="3"
          />

          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-gray-600 hover:bg-gray-100 rounded-lg transition-colors p-2"
                title="Add emoji"
                style={{ marginLeft: '-50px' }}
              >
                <Smile className="w-5 h-5" />
              </button>
              <Button
                onClick={handleSubmit}
                disabled={!content.trim()}
                size="sm"
              >
                Post It!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CreatePost;