import React from 'react';
import { Plus } from 'lucide-react';
import Card from '../common/Card';

const PopularCollections = ({ collections }) => {
  return (
    <Card>
      <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Collections</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {/* Add Collection Button */}
        <button className="flex-shrink-0 w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
          <Plus className="w-6 h-6 text-white" />
          <span className="sr-only">Add collection</span>
        </button>

        {/* Collection Items */}
        {collections?.map((collection, index) => (
          <div key={index} className="flex-shrink-0 text-center">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 hover:border-purple-500 transition-colors cursor-pointer">
              <img
                src={collection.image}
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs text-gray-700 mt-2 truncate w-20">
              {collection.name}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PopularCollections;