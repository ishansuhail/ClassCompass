import { useEffect, useState } from "react";

export default function RPIClassCompass() {
  const categories = [
    {
      name: "Architecture",
      code: "ARCH",
      subLabels: ["ARCH - Architecture"],
    },
    {
      name: "Engineering",
      code: "ENGR",
      subLabels: ["ENGR - Engineering"],
    },
    {
      name: "Science",
      code: "SCI",
      subLabels: ["SCI - Science"],
    },
    {
      name: "Interdisciplinary & Other",
      code: "INTER",
      subLabels: ["INTER - Other"],
    },
    {
      name: "Management",
      code: "MGMT",
      subLabels: ["MGMT - Management"],
    },
  ];

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
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="border-2 border-yellow-500 p-4 rounded-lg
                         transition-colors flex flex-col"
              /* No hover/click on the outer box */
            >
              <h3 className="text-xl font-bold text-gray-900">
                {cat.name}
              </h3>
              <div className="mt-3 flex flex-col items-start space-y-2">
                {cat.subLabels.map((sub) => (
                  <div
                    key={sub}
                    className="border-2 border-yellow-500 px-4 py-2 rounded-full text-gray-700 text-sm 
                               hover:bg-yellow-50 cursor-pointer transition-colors"
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