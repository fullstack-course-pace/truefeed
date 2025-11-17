import React from 'react';
import { Home, Users, Image, Newspaper, User, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import Card from '../common/Card';
import Button from '../common/Button';
import clsx from 'clsx';

const Sidebar = () => {
  const { user } = useAuth();
  const [activeItem, setActiveItem] = React.useState('News Feed');

  const menuItems = [
    { name: 'Home', icon: Home },
    { name: 'People', icon: Users, badge: 1 },
    { name: 'Photos', icon: Image },
    { name: 'News Feed', icon: Newspaper },
    { name: 'Profile', icon: User },
    { name: 'Settings', icon: Settings, badge: 1 },
  ];

  return (
    <div className="w-64 sticky top-4 h-[calc(100vh-2rem)] flex flex-col gap-4">
      {/* User Profile Card */}
      <Card>
        <div className="flex items-center gap-3">
          <Avatar src={user?.avatar} alt={user?.name} size="lg" />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-gray-900 truncate">{user?.name}</h3>
            <p className="text-sm text-gray-500 truncate">{user?.username}</p>
          </div>
        </div>
      </Card>

      {/* Navigation Menu */}
      <Card className="flex-1">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;
            
            return (
              <button
                key={item.name}
                onClick={() => setActiveItem(item.name)}
                className={clsx(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                  isActive
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className={clsx('flex-1 text-left', isActive && 'font-semibold')}>
                  {item.name}
                </span>
                {item.badge && (
                  <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </Card>

      {/* Invitations Card */}
      <Card noPadding className="overflow-hidden">
        <div className="relative h-32">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400"
            alt="Invitation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <h4 className="text-white font-bold text-sm mb-1">
              How To Build A Strong Company
            </h4>
          </div>
        </div>
        <div className="p-3 flex items-center gap-2">
          <Button size="sm" className="flex-1">
            Accept Invitation
          </Button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            ✕
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;