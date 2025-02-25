import { useState } from "react";
import { ChevronDown } from "lucide-react";

const classes = Array(6).fill("XXXX-XXXX");

export default function ClassCompass() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="w-full bg-blue-100 border-2 border-yellow-500 py-8 px-8 shadow-md flex items-start">
        {/* Logo on the left */}
        <img src="/logo.png" alt="ClassCompass Logo" className="w-40 h-40 mr-6" />

        {/* Centered Header Text + Centered Search Bar */}
        <div className="flex flex-col items-center w-full">
          {/* Header Text with additional spacing between lines */}
          <h1 className="text-4xl font-bold text-gray-900">
            Rensselaer Polytechnic Institute Class Compass
          </h1>
          <p className="text-2xl text-gray-700 mt-2">Search for your class below</p>

          {/* Search Bar + Button */}
          <div className="mt-6 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search for a class name or course-code..."
              className="w-96 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="bg-white text-gray-700 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-200">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results Section: Wider container for bigger cards */}
      <div className="mt-8 w-full max-w-6xl mx-auto">
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

        {/* Class Cards (full width in a wider container) */}
        <div className="space-y-2">
          {classes.map((course, index) => (
            <div
              key={index}
              className="cursor-pointer w-full bg-white border border-gray-300 rounded-lg shadow-sm p-6 flex justify-between items-center hover:bg-gray-100"
            >
              {course}
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