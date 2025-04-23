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
      // Fetch or filter classes based on the subject code
      // This is a placeholder for fetching logic
      const filteredClasses = mockFetchClasses().filter(cls => cls.subjectCode === subjectCode);
      setClasses(filteredClasses);
    }
  }, [searchParams]);


  const mockFetchClasses = () => [
    { id: 1, name: 'Intro to Architecture', subjectCode: 'ARCH' },
    { id: 2, name: 'Advanced Engineering', subjectCode: 'ENGR' },
    { id: 3, name: 'Web Science Basics', subjectCode: 'ITWS' },
   
  ];

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