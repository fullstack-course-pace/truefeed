import React, { useState } from 'react';
import { Search, MoreHorizontal } from 'lucide-react';
import Avatar from '../common/Avatar';
import Card from '../common/Card';
import Button from '../common/Button';

const RightPanel = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'Tyrell Barrows',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrell',
      mutualFriends: 12,
    },
    {
      id: 2,
      name: 'Selena Gomez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Selena',
      mutualFriends: 8,
    },
  ]);

  const [contacts] = useState([
    { id: 1, name: 'Amanda Miles', online: true },
    { id: 2, name: 'Melissa Byron', online: true },
    { id: 3, name: 'Ronald Bezos', online: false },
    { id: 4, name: 'Billy Rosewood', online: false },
    { id: 5, name: 'Katty Monroe', online: true },
    { id: 6, name: 'Kurt Williamson', online: false },
    { id: 7, name: 'Sarah Whitman', online: true },
    { id: 8, name: 'Alena Vinkova', online: false },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleAccept = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleDecline = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-72 sticky top-4 h-[calc(100vh-2rem)] flex flex-col gap-4">
      {/* Requests Card */}
      {requests.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">REQUESTS</h3>
            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {requests.length}
            </span>
          </div>
          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id}>
                <div className="flex items-center gap-3 mb-3">
                  <Avatar src={request.avatar} alt={request.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                      {request.name}
                    </h4>
                    <p className="text-xs text-gray-500">wants to add you to friends</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleAccept(request.id)}
                    className="flex-1"
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleDecline(request.id)}
                    className="flex-1"
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Contacts Card */}
      <Card className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">CONTACTS</h3>
          <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
            {contacts.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <Avatar
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`}
                  alt={contact.name}
                  size="sm"
                  online={contact.online}
                />
                <span className="text-sm text-gray-900">{contact.name}</span>
              </div>
              <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RightPanel;