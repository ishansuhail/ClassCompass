import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";

const CoursePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAnalytics, setSelectedAnalytics] = useState({}); // State to track selected buttons

  const courseStats = [
    { title: "Attendance", description: "Details about attendance policies and requirements." },
    { title: "Exams", description: "Information on exam weight, difficulty, and structure." },
    { title: "Homework", description: "Overview of homework frequency, difficulty, and expectations." },
    { title: "Grading Policy", description: "Breakdown of grade components and grading criteria." },
  ];

  const studentAnalytics = [
    { title: "Hours Spent per Week", description: "Average time spent studying and attending class." },
    { title: "Class Difficulty", description: "Subjective rating of the course difficulty." },
    { title: "Grade Attained", description: "Average grade received by students." },
  ];

  const toggleSelection = (index) => {
    setSelectedAnalytics((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle selected state
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-100 border-2 border-yellow-500 w-full py-8 flex flex-col items-center">
        <img src="/logo.png" alt="ClassCompass Logo" className="w-16 h-16 mb-2" />
        <h1 className="text-4xl font-bold text-gray-900">CSCI1010</h1>
        <p className="text-lg text-gray-700">Intro to Computer Science</p>

        {/* Dropdown for Past Syllabi */}
        <div className="relative mt-4">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-white border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none"
          >
            Past Syllabi ▼
          </button>
          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-md">
              <ul className="py-2 text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Fall 2024</li>
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Spring 2024</li>
              </ul>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Wrapper */}
      <div className="max-w-6xl mx-auto p-6">
        {/* Course Stats Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 text-left">Course Stats</h2>
          <p className="text-gray-600 text-left">Info provided by the RPI community</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {courseStats.map((stat, index) => (
              <button
                key={index}
                className="w-full p-4 bg-white shadow rounded-lg flex items-start border border-yellow-500 text-left hover:bg-gray-200 transition duration-200"
              >
                <FaInfoCircle className="text-blue-500 w-6 h-6 mr-3" />
                <div>
                  <h3 className="font-semibold text-lg">{stat.title}</h3>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Student Analytics Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 text-left">Student Body Analytics</h2>
          <p className="text-gray-600 text-left">Analytics submitted by the RPI community</p>
          <div className="space-y-4 mt-4">
            {studentAnalytics.map((analytic, index) => (
              <div key={index} className="p-4 bg-white border border-yellow-500 rounded-lg shadow text-left">
                <h3 className="font-semibold text-lg">{analytic.title}</h3>
                <p className="text-sm text-gray-500">{analytic.description}</p>
                <button
                  onClick={() => toggleSelection(index)}
                  className={`mt-2 px-3 py-1 border rounded transition duration-200 ${
                    selectedAnalytics[index] ? "bg-gray-300" : "bg-gray-100 hover:bg-gray-300"
                  }`}
                >
                  View Response Analytics
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Student Reviews Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900">Student Reviews</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
            {[1, 2, 3].map((review, index) => (
              <div key={index} className="p-4 bg-white shadow rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg">Review Title {index + 1}</h3>
                <p className="text-xs text-gray-500">Semester/Year</p>
                <p className="text-sm text-gray-600">Reviewer Name</p>
                <p className="text-xs text-gray-400">Date</p>
              </div>
            ))}
          </div>
        </section>

        {/* Submit Course Stats Form */}
        <section className="bg-blue-100 p-6 rounded-lg border border-yellow-500 mt-8">
          <h2 className="text-2xl font-bold text-center">Submit Course Statistics</h2>
          <p className="text-gray-700 text-center">Share your experience and course details</p>
          <form className="mt-4 space-y-4 max-w-md mx-auto">
            <div>
              <label htmlFor="attendance" className="block text-sm font-medium text-gray-700">
                Attendance
              </label>
              <select id="attendance" className="mt-1 block w-full p-2 border rounded">
                <option value="">Select Attendance Requirement</option>
                <option value="required">Required</option>
                <option value="not_required">Not Required</option>
              </select>
            </div>
            <div>
              <label htmlFor="exams" className="block text-sm font-medium text-gray-700">
                Exams
              </label>
              <input
                id="exams"
                type="text"
                placeholder="Exam weight, difficulty, etc."
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="homework" className="block text-sm font-medium text-gray-700">
                Homework
              </label>
              <input
                id="homework"
                type="text"
                placeholder="Homework frequency and difficulty"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="grading" className="block text-sm font-medium text-gray-700">
                Grading Policy
              </label>
              <input
                id="grading"
                type="text"
                placeholder="Breakdown of grades"
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-black text-white rounded">
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CoursePage;
