import React from 'react';
import Post from '../dashboard/Post';
import Card from '../common/Card';

const UserPosts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-gray-500">No posts yet</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900">Posts</h3>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;