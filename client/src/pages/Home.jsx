import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RPIClassCompass() {
  const [courseSubjects, setCourseSubjects] = useState({});

  useEffect(() => {
    async function fetchCoursePrefixes() {
      try {
        const response = await fetch("/api/unique-course-prefixes");
        const result = await response.json();

        if (result.success) {
          const groupedCourses = result.prefixes.reduce((acc, [code, school]) => {
            acc[school] = acc[school] || [];
            acc[school].push(code);
            return acc;
          }, {});

          setCourseSubjects(groupedCourses);
        } else {
          console.error("Failed to fetch prefixes:", result.error);
        }
      } catch (error) {
        console.error("Error fetching course prefixes:", error);
      }
    }

    fetchCoursePrefixes();
  }, []);

  const navigate = useNavigate();

  const handleCourseClick = (school) => {
    navigate(`/Search?school=${encodeURIComponent(school)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Logo & Title */}
      <div className="flex flex-col items-center text-center mb-6">
        <img
          src="/logo.png"
          alt="ClassCompass Logo"
          className="w-40 h-40 mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-900">
          RPI ClassCompass
        </h1>
        <p className="text-2xl text-gray-700 mt-2">
          Search for your class below
        </p>
      </div>

      {/* Blue Box for Search Bar */}
      <div className="w-full bg-blue-100 border-2 border-yellow-500 py-8 px-8 shadow-md flex justify-center">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search for a class name or course-code..."
            className="w-[400px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-white text-gray-700 text-xl px-10 py-3 border border-gray-300 rounded-lg hover:bg-gray-200">
            Search
          </button>
        </div>
      </div>

      {/* Course Categories Section */}
      <div className="mt-8 w-full max-w-6xl mx-auto p-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 text-left">
            Course Categories
          </h2>
          <p className="text-gray-600 text-left">
            Click any course category to start searching!
          </p>
        </div>

        {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
            {Object.entries(courseSubjects).map(([school, courses]) => (
              <div
              key={school}
              className="border-2 border-yellow-500 p-4 rounded-lg
                        transition-colors flex flex-col"
              /* No hover/click on the outer box */
            >
              <h3 className="text-xl font-bold text-gray-900">
                {school}
              </h3>
              <div className="mt-3 flex flex-col items-start space-y-2">
                {courses.map((sub) => (
                  <div
                    key={sub}
                    className="border-2 border-yellow-500 px-4 py-2 rounded-full text-gray-700 text-sm 
                              hover:bg-yellow-50 cursor-pointer transition-colors w-full text-center"
                    onClick = {() => handleCourseClick(school)}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}