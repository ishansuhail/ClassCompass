import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GrCalendar, GrBarChart, GrCertificate, GrCatalog } from "react-icons/gr"; // Importing new icons

const CoursePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAnalytics, setSelectedAnalytics] = useState({}); // State to track selected analytics buttons
  const [selectedCourseStats, setSelectedCourseStats] = useState({}); // State to track selected course stats buttons
  const [syllabi, setSyllabi] = useState({});

  const courseStats = [
    { title: "Attendance", description: "Details about attendance policies and requirements.", icon: <GrCalendar /> },
    { title: "Exams", description: "Information on exam weight, difficulty, and structure.", icon: <GrCertificate /> },
    { title: "Homework", description: "Overview of homework frequency, difficulty, and expectations.", icon: <GrCatalog /> },
    { title: "Grading Policy", description: "Breakdown of grade components and grading criteria.", icon: <GrBarChart /> },
  ];

  const studentAnalytics = [
    { title: "Hours Spent per Week", description: "Average time spent studying and attending class." },
    { title: "Class Difficulty", description: "Subjective rating of the course difficulty." },
    { title: "Grade Attained", description: "Average grade received by students." },
  ];

  const toggleCourseStatsSelection = (index) => {
    setSelectedCourseStats((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle selected state
    }));
  };

  const [formStep, setFormStep] = useState(1); // Tracks which step of the form we are on
  const [selectedAssessments, setSelectedAssessments] = useState({});
  const [assessmentCounts, setAssessmentCounts] = useState({});
  const assessments = ["Labs", "Quizzes", "Homeworks", "Exams", "Final Exam"];

  const toggleAssessment = (assessment) => {
    setSelectedAssessments((prev) => ({
      ...prev,
      [assessment]: !prev[assessment] // Toggle selection
    }));
  };

  const handleCountChange = (assessment, value) => {
    setAssessmentCounts((prev) => ({
      ...prev,
      [assessment]: value
    }));
  };

  const handleNextStep = () => {
    setFormStep(2); // Move to the next step
  };


  function formatSemester(semester) {
    
    if (typeof semester === 'string' && semester.includes('_')) {
      const [year, season] = semester.split('_');
      return `${season} ${year}`;
    }
    
    return semester;
  }

  const [assessmentWeights, setAssessmentWeights] = useState({});
  const [totalWeight, setTotalWeight] = useState(0);

  const handleWeightChange = (assessment, value) => {
    let weight = parseFloat(value) || 0; // Ensure input is a number or defaults to 0
    let newWeights = { ...assessmentWeights, [assessment]: weight };

    let sum = Object.values(newWeights).reduce((acc, val) => acc + val, 0);

    // Prevent weight from exceeding 100%
    if (sum > 100) return;

    setAssessmentWeights(newWeights);
    setTotalWeight(sum);
  };


  const location = useLocation();
  const course = location.state?.course;

  useEffect(() => {
    setSyllabi(course.sections)
  })


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      {/* Updated layout to match the ClassCompass style: pinned logo, centered text & dropdown */}
      {/* Header Section */}
      <header className="w-full bg-blue-100 border-2 border-yellow-500 py-8 px-8 shadow-md relative flex justify-center">
        {/* Logo pinned on the left (absolute positioning) */}
        <img
          src="/logo.png"
          alt="ClassCompass Logo"
          className="w-40 h-40 absolute left-8 top-1/2 transform -translate-y-1/2"
        />

        {/* Centered Course Info */}
        <div className="flex flex-col items-center text-center">
          {/* Keep the original text */}
          <h1 className="text-4xl font-bold text-gray-900">{course.course_code}</h1>
          <p className="text-2xl text-gray-700">{course.name}</p>

          {/* Keep the original dropdown code */}
          <div className="relative mt-4">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-white border border-gray-300 rounded px-4 py-2 shadow-sm focus:outline-none"
            >
              Past Syllabi ▼
            </button>
            {isDropdownOpen && (
              <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-40 bg-white border border-gray-300 rounded shadow-md">
                <ul className="py-2 text-gray-700">
                  {syllabi.map((x) =>(
                    <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">{formatSemester(x.semester)}</li>
                  ))}
                  {/* <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Fall 2024</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Spring 2024</li> */}
                </ul>
              </div>
            )}
          </div>
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
                onClick={() => toggleCourseStatsSelection(index)}
                className={`w-full p-6 shadow rounded-lg flex items-center border border-yellow-500 text-left transition duration-200 ${
                  selectedCourseStats[index] ? "bg-gray-200" : "bg-white hover:bg-gray-200"
                }`}
              >
                <div className="text-blue-500 text-2xl flex-shrink-0 self-center mr-4">{stat.icon}</div>
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
                  className="mt-2 px-3 py-1 border rounded transition duration-200 bg-gray-100 hover:bg-gray-300"
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

          {formStep === 1 && (
            <div className="mt-4 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900">What does the class have?</h3>
              <div className="flex flex-col space-y-2 mt-3">
                {assessments.map((assessment) => (
                  <div key={assessment} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={assessment}
                      checked={!!selectedAssessments[assessment]}
                      onChange={() => toggleAssessment(assessment)}
                      className="w-5 h-5"
                    />
                    <label htmlFor={assessment} className="text-gray-800">{assessment}</label>
                    
                    {selectedAssessments[assessment] && assessment !== "Final Exam" && (
                      <input
                        type="number"
                        min="1"
                        placeholder="[Optional] How many?"
                        className="ml-4 p-1 border rounded w-auto text-center"
                        value={assessmentCounts[assessment] || ""}
                        onChange={(e) => handleCountChange(assessment, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <button onClick={handleNextStep} className="w-full px-4 py-2 mt-4 bg-black text-white rounded">
                Next
              </button>
            </div>
          )}

          {formStep === 2 && (
            <div className="mt-4 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900">Distribute the weight for each category</h3>
              <p className="mt-2 text-gray-600">Total must equal 100%.</p>

              <div className="space-y-3 mt-4">
                {Object.keys(selectedAssessments).map((assessment) =>
                  selectedAssessments[assessment] ? (
                    <div key={assessment} className="flex justify-between items-center">
                      <label className="text-gray-800">{assessment}</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={assessmentWeights[assessment] || ""}
                        onChange={(e) => handleWeightChange(assessment, e.target.value)}
                        className="p-1 border rounded w-20 text-center"
                      />
                    </div>
                  ) : null
                )}
              </div>

              <p className={`mt-2 ${totalWeight === 100 ? "text-green-600" : "text-red-600"}`}>
                Total: {totalWeight}% {totalWeight !== 100 && "(Must equal 100%)"}
              </p>
            </div>
          )}

        </section>

      </div>
    </div>
  );
};

export default CoursePage;