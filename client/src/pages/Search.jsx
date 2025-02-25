import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";



export default function ClassCompass() {
  const [search, setSearch] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ search })
      });
      const { data } = await response.json();
      const topResults = data.slice(0, 10);
      setClasses(topResults);
    };

    fetchResults();
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {/* Header Section */}
      <div className="w-full max-w-4xl bg-blue-100 text-center py-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold">Rensselaer Polytechnic Institute Class Compass</h1>
        <p className="mt-4 text-lg">Search for your class below</p>

        {/* Search Bar */}
        <div className="mt-4 flex items-center justify-center space-x-2">
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200">
            Add Filters
          </button>
          <input
            type="text"
            placeholder="Search for a class name or course-code..."
            className="w-96 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8 w-full max-w-3xl">
        <h2 className="text-xl font-semibold text-center">Search Results</h2>
        <p className="text-center text-gray-600">Click any class to see more information</p>

        {/* Class Cards */}
        <div className="mt-4 space-y-2">
          {classes.map((course) => (
            <div
              key={course.section_id}
              className="cursor-pointer bg-white border border-gray-300 rounded-lg shadow-sm p-4 flex justify-between items-center hover:bg-gray-100"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{course.course_code}</span>
                  <span className="text-gray-600">|</span>
                  <span className="font-medium">{course.name}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <span>{course.section} • {course.semester} • {course.school}</span>
                </div>
              </div>
              <ChevronDown size={20} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-4">
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200">
            ← Previous
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg bg-black text-white">
            1
          </button>
          <span>...</span>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200">
            67
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200">
            68
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200">
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

