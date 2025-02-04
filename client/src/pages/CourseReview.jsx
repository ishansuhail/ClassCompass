import React from "react";

const CoursePage = () => {
  const courseStats = [
    {
      title: "Attendance",
      description: "Details about attendance policies and requirements."
    },
    {
      title: "Exams",
      description: "Information on exam weight, difficulty, and structure."
    },
    {
      title: "Homework",
      description: "Overview of homework frequency, difficulty, and expectations."
    },
    {
      title: "Grading Policy",
      description: "Breakdown of grade components and grading criteria."
    }
  ];

  const studentAnalytics = [
    {
      title: "Hours Spent per Week",
      description: "Average time spent studying and attending class."
    },
    {
      title: "Class Difficulty",
      description: "Subjective rating of the course difficulty."
    },
    {
      title: "Grade Attained",
      description: "Average grade received by students."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      {/* Header Section with Logo */}
      <header className="bg-blue-200 p-6 rounded-lg border border-yellow-500 flex items-center">
        <img src="/logo.png" alt="ClassCompass Logo" className="w-12 h-12 mr-4" />
        <div className="text-center flex-grow">
            <h1 className="text-3xl font-bold text-red-500">Tailwind is Working!</h1>
            <p className="text-lg">Intro to Computer Science</p>
        </div>
      </header>


      {/* Course Stats Section */}
      <section>
        <h2 className="text-xl font-semibold">Course Stats</h2>
        <p className="text-gray-600">Info provided by the RPI community</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {courseStats.map((stat, index) => (
            <div key={index} className="p-4 border rounded shadow-sm">
              <h3 className="font-semibold">{stat.title}</h3>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Student Body Analytics Section */}
      <section>
        <h2 className="text-xl font-semibold">Student Body Analytics</h2>
        <p className="text-gray-600">Analytics submitted by the RPI community</p>
        <div className="space-y-4 mt-4">
          {studentAnalytics.map((analytic, index) => (
            <div key={index} className="p-4 border border-yellow-500 rounded">
              <h3 className="font-semibold">{analytic.title}</h3>
              <p className="text-sm text-gray-500">{analytic.description}</p>
              <button className="mt-2 px-3 py-1 bg-gray-200 border rounded">
                View Response Analytics
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Student Reviews Section */}
      <section>
        <h2 className="text-xl font-semibold">Student Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {[1, 2, 3].map((review, index) => (
            <div key={index} className="p-4 border rounded shadow-sm">
              <h3 className="font-semibold">Review Title {index + 1}</h3>
              <p className="text-xs text-gray-500">Semester/Year</p>
              <p className="text-sm text-gray-600">Reviewer Name</p>
              <p className="text-xs text-gray-400">Date</p>
            </div>
          ))}
        </div>
      </section>

      {/* Submit Course Stats Form */}
      <section className="bg-blue-100 p-6 rounded-lg border border-yellow-500">
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
  );
};

export default CoursePage;
