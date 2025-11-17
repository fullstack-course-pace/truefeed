import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import PageTransition from '../components/common/PageTransition';
import BannerHeader from '../components/profile/BannerHeader';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import BioSection from '../components/profile/BioSection';
import PopularCollections from '../components/profile/PopularCollections';
import TeamSection from '../components/profile/TeamSection';
import UserPosts from '../components/profile/UserPosts';
import EditProfileModal from '../components/profile/EditProfileModal';

const ProfilePage = () => {
  const { user: currentUser, isAuthenticated, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const { userId } = useParams();

  // Check if viewing own profile
  const isOwnProfile = !userId || userId === currentUser?.id;

  // Show edit modal state
  const [showEditModal, setShowEditModal] = useState(false);

  // Profile data - initialize from currentUser for own profile
  const [profileData, setProfileData] = useState({
    id: currentUser?.id || '1',
    name: currentUser?.name || 'Jenna Smith',
    role: currentUser?.role || 'Art Director',
    avatar: currentUser?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jenna',
    bannerImage: currentUser?.bannerImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
    bio: currentUser?.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    website: currentUser?.website || 'https://dribbble.com/BLVCKCLXDS',
    location: currentUser?.location || 'MONTREAL, QC, Canada',
    skills: currentUser?.skills || ['Adobe Photoshop', 'Adobe XD CC', 'Figma'],
    stats: {
      posts: 42,
      followers: '1,302',
      likes: '18K',
    },
    collections: [
      {
        name: 'Savana',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=200',
      },
      {
        name: 'Design',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200',
      },
      {
        name: 'Spaces',
        image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=200',
      },
      {
        name: 'Travel',
        image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=200',
      },
      {
        name: 'Architecture',
        image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=200',
      },
    ],
    teams: [
      {
        id: 1,
        name: 'ROYAL UI FORCE',
        logo: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=200',
        memberSince: 'FOUNDED 2019',
        joinDate: 'NOV, 2014',
        memberCount: 42,
      },
    ],
    posts: [],
  });

  // Load posts from localStorage (to get user's actual posts)
  useEffect(() => {
    if (isAuthenticated && isOwnProfile) {
      // Sync with currentUser data
      setProfileData(prev => ({
        ...prev,
        name: currentUser?.name,
        role: currentUser?.role,
        avatar: currentUser?.avatar,
        bio: currentUser?.bio,
        website: currentUser?.website,
        location: currentUser?.location,
        skills: currentUser?.skills,
        bannerImage: currentUser?.bannerImage || prev.bannerImage,
      }));

      // Load user's posts from localStorage
      const storedPosts = localStorage.getItem('truefeed_posts');
      if (storedPosts) {
        const allPosts = JSON.parse(storedPosts);
        const userPosts = allPosts.filter(post => post.userId === currentUser?.id);
        setProfileData(prev => ({ ...prev, posts: userPosts }));
      }
    }
  }, [currentUser, isAuthenticated, isOwnProfile]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleBannerChange = (newBanner) => {
    setProfileData({ ...profileData, bannerImage: newBanner });
    if (isOwnProfile) {
      updateUser({ bannerImage: newBanner });
    }
  };

  const handleAvatarChange = (newAvatar) => {
    setProfileData({ ...profileData, avatar: newAvatar });
    if (isOwnProfile) {
      updateUser({ avatar: newAvatar });
      // Update all user's posts with new avatar
      updatePostsAvatar(newAvatar);
    }
  };

  const handleBioUpdate = (updates) => {
    setProfileData({ ...profileData, ...updates });
    if (isOwnProfile) {
      updateUser(updates);
    }
  };

  const handleProfileSave = (updatedData) => {
    setProfileData({ ...profileData, ...updatedData });
    if (isOwnProfile) {
      // Update user in AuthContext (this updates it site-wide)
      updateUser(updatedData);
      
      // Update all existing posts with new name and avatar
      updateAllUserPosts(updatedData);
    }
  };

  const updateAllUserPosts = (updatedData) => {
    const storedPosts = localStorage.getItem('truefeed_posts');
    if (storedPosts) {
      const allPosts = JSON.parse(storedPosts);
      const updatedPosts = allPosts.map(post => {
        if (post.userId === currentUser?.id) {
          return {
            ...post,
            user: updatedData.name || post.user,
            avatar: updatedData.avatar || post.avatar,
          };
        }
        return post;
      });
      localStorage.setItem('truefeed_posts', JSON.stringify(updatedPosts));
      
      // Update local state
      const userPosts = updatedPosts.filter(post => post.userId === currentUser?.id);
      setProfileData(prev => ({ ...prev, posts: userPosts }));
    }
  };

  const updatePostsAvatar = (newAvatar) => {
    const storedPosts = localStorage.getItem('truefeed_posts');
    if (storedPosts) {
      const allPosts = JSON.parse(storedPosts);
      const updatedPosts = allPosts.map(post => {
        if (post.userId === currentUser?.id) {
          return { ...post, avatar: newAvatar };
        }
        return post;
      });
      localStorage.setItem('truefeed_posts', JSON.stringify(updatedPosts));
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <PageTransition variant="slideUp">
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Back Button + Logo */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-600" />
                </button>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">TrueFeed</h1>
                </div>
              </div>

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
                <span className="text-sm text-gray-600">
                  Hello, <span className="font-semibold">{currentUser?.name?.split(' ')[0]}</span>
                </span>
                <button onClick={logout} className="hover:opacity-80 transition-opacity">
                  <Avatar src={currentUser?.avatar} alt={currentUser?.name} size="md" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Banner */}
          <BannerHeader
            bannerImage={profileData.bannerImage}
            isOwnProfile={isOwnProfile}
            onBannerChange={handleBannerChange}
          />

          {/* Profile Content */}
          <div className="flex gap-6 mt-6">
            {/* Left Sidebar */}
            <ProfileSidebar
              user={profileData}
              isOwnProfile={isOwnProfile}
              onAvatarChange={handleAvatarChange}
              onEditProfile={() => setShowEditModal(true)}
            />

            {/* Center Content */}
            <div className="flex-1 space-y-6">
              {/* Popular Collections */}
              <PopularCollections collections={profileData.collections} />

              {/* Team Section */}
              <TeamSection teams={profileData.teams} />

              {/* User Posts */}
              <UserPosts posts={profileData.posts} />
            </div>

            {/* Right Sidebar */}
            <div className="w-80 space-y-6">
              {/* Bio Section */}
              <BioSection
                user={profileData}
                isOwnProfile={isOwnProfile}
                onBioUpdate={handleBioUpdate}
              />
            </div>
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <EditProfileModal
            user={profileData}
            onClose={() => setShowEditModal(false)}
            onSave={handleProfileSave}
          />
        )}
      </div>
    </PageTransition>
  );
};

export default ProfilePage;