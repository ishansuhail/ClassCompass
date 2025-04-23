import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const Subject = () => {
  const location = useLocation();
  const { category } = location.state || {};
  const [searchParams] = useSearchParams();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const subjectCode = searchParams.get('subject');
    if (subjectCode) {
      fetchClasses(subjectCode);
    }
  }, [searchParams]);

  const fetchClasses = async (subjectCode) => {
    try {
      const response = await fetch(`/api/classes?subject=${subjectCode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch classes');
      }
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-900">{category?.name || 'Subject'}</h1>
      <p className="text-2xl text-gray-700 mt-2">Explore courses in {category?.name}</p>
      <div className="mt-4">
        {classes.map(cls => (
          <div key={cls.id} className="p-4 bg-white shadow rounded-lg mb-4">
            <h2 className="text-xl font-semibold">{cls.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subject; 