import React from 'react';
import { useLocation } from 'react-router-dom';

const Subject = () => {
  const location = useLocation();
  const { category } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-900">{category?.name || 'Subject'}</h1>
      <p className="text-2xl text-gray-700 mt-2">Explore courses in {category?.name}</p>
      {/* Add more content here as needed */}
    </div>
  );
};

export default Subject; 