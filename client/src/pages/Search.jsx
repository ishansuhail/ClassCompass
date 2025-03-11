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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      {/* Use a relative container + absolute positioning for the logo, 
          and center the text + search bar within. */}
      <div className="w-full bg-blue-100 border-2 border-yellow-500 py-8 px-8 shadow-md relative flex justify-center">
        {/* Logo (pinned on the left) */}
        <img
          src="/logo.png"
          alt="ClassCompass Logo"
          className="w-40 h-40 absolute left-8 top-1/2 transform -translate-y-1/2"
        />

        {/* Centered Header Text and Search Bar */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-gray-900">RPI Class Compass</h1>
          <p className="text-2xl text-gray-700 mt-2">Search for your class below</p>

          {/* Larger Search Bar + Button */}
          <div className="mt-6 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search for a class name or course-code..."
              className="w-[400px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-white text-gray-700 text-xl px-10 py-3 border border-gray-300 rounded-lg hover:bg-gray-200">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results Section: Wider container for bigger cards */}
      <div className="mt-8 w-full max-w-6xl mx-auto p-6">
        {/* Single row for "Search Results" + subtext + "Add Filters" */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 text-left">Search Results</h2>
            <p className="text-gray-600 text-left">Click any class to see more information</p>
          </div>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200">
            Add Filters
          </button>
        </div>

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
        <div className="mt-4 flex space-x-4 justify-center">
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