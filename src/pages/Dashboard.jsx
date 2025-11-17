import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import Sidebar from '../components/dashboard/Sidebar';
import Stories from '../components/dashboard/Stories';
import CreatePost from '../components/dashboard/CreatePost';
import Post from '../components/dashboard/Post';
import RightPanel from '../components/dashboard/RightPanel';
import CreatePostModal from '../components/dashboard/CreatePostModal';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [stories, setStories] = useState([
    {
      id: 1,
      user: 'Sam Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
    },
    {
      id: 2,
      user: 'Laura Fisher',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400',
    },
    {
      id: 3,
      user: 'Diana Voss',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
      image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400',
    },
    {
      id: 4,
      user: 'Roger Miller',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roger',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    },
  ]);

  const [posts, setPosts] = useState([]);

  // Load posts from localStorage on mount
  useEffect(() => {
    const storedPosts = localStorage.getItem('truefeed_posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      // Initialize with default posts
      const defaultPosts = [
        {
          id: Date.now(),
          userId: 'laura123',
          user: 'Laura Fisher',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
          time: '12 hours ago',
          content: 'This was one of the most epic journeys, that I\'ve got myself involved in. Maybe one of the most memorizable in my entire life!',
          images: [
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
            'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
            'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800',
          ],
          likes: 234,
          comments: 45,
        },
      ];
      setPosts(defaultPosts);
      localStorage.setItem('truefeed_posts', JSON.stringify(defaultPosts));
    }
  }, []);

  // Update posts when user profile changes
  useEffect(() => {
    if (user) {
      const storedPosts = localStorage.getItem('truefeed_posts');
      if (storedPosts) {
        const allPosts = JSON.parse(storedPosts);
        const updatedPosts = allPosts.map(post => {
          if (post.userId === user.id) {
            return {
              ...post,
              user: user.name,
              avatar: user.avatar,
            };
          }
          return post;
        });
        setPosts(updatedPosts);
        localStorage.setItem('truefeed_posts', JSON.stringify(updatedPosts));
      }
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const handleAddStory = (image) => {
    const newStory = {
      id: Date.now(),
      user: user?.name,
      avatar: user?.avatar,
      image: image,
    };
    setStories([newStory, ...stories]);
  };

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      userId: user?.id,
      user: user?.name,
      avatar: user?.avatar,
      time: 'Just now',
      content: postData.content,
      images: postData.images,
      likes: 0,
      comments: 0,
    };
    
    // Update state
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    
    // Save to localStorage
    localStorage.setItem('truefeed_posts', JSON.stringify(updatedPosts));
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    logout();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo - Purple TrueFeed only */}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                TrueFeed
              </h1>

              {/* Search Bar */}
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4">
                <Button 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus className="w-4 h-4" />
                  Create
                </Button>
                
                {/* User Menu */}
                <div className="relative user-menu-container">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <Avatar src={user?.avatar} alt={user?.name} size="md" />
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 animate-slide-up">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                      </div>

                      {/* Menu Items */}
                      <button
                        onClick={handleProfileClick}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        <span>View Profile</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex gap-6">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Center Feed */}
            <div className="flex-1 max-w-2xl space-y-6">
              {/* Stories */}
              <Stories stories={stories} onAddStory={handleAddStory} />

              {/* Create Post */}
              <CreatePost onPost={handleCreatePost} />

              {/* Posts Feed */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <Post key={post.id} post={post} />
                ))}
              </div>
            </div>

            {/* Right Panel */}
            <RightPanel />
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreateModal && (
          <CreatePostModal
            onClose={() => setShowCreateModal(false)}
            onPost={handleCreatePost}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default Dashboard;