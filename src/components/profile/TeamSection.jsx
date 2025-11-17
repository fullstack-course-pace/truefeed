import React from 'react';
import { Users } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';

const TeamSection = ({ teams }) => {
  if (!teams || teams.length === 0) return null;

  return (
    <Card>
      <h3 className="text-sm text-gray-500 uppercase font-semibold mb-4">
        Jenna appears in these teams
      </h3>
      {teams.map((team) => (
        <div key={team.id} className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
            <img
              src={team.logo}
              alt={team.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-900 text-lg">{team.name}</h4>
            <p className="text-xs text-gray-500">
              {team.memberSince}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JENNA IS A MEMBER SINCE {team.joinDate}
            </p>
          </div>
          <Button size="sm" className="flex-shrink-0">
            Follow
          </Button>
        </div>
      ))}
      <p className="text-xs text-gray-500 mt-4">{teams[0]?.memberCount} members</p>
    </Card>
  );
};

export default TeamSection;