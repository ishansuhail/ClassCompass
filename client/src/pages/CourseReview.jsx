import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GrCalendar, GrBarChart, GrCertificate, GrCatalog } from "react-icons/gr"; // Importing new icons

const CoursePage = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAnalytics, setSelectedAnalytics] = useState({}); // State to track selected analytics buttons
  const [selectedCourseStats, setSelectedCourseStats] = useState({}); // State to track selected course stats buttons

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

  const [formStep, setFormStep] = useState(0); // Tracks which step of the form we are on
  const [selectedAssessments, setSelectedAssessments] = useState({});
  const [customAssessments, setCustomAssessments] = useState([""]); // Stores user-defined "Other" options
  const [customAttemptedNext, setCustomAttemptedNext] = useState(false);
  const [assessmentCounts, setAssessmentCounts] = useState({});
  const assessments = ["Labs", "Quizzes", "Homeworks", "Exams", "Final Exam", "Projects", "Other"];

  const [usesTextbook, setUsesTextbook] = useState(null);

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
    if (selectedAssessments["Other"]) {
      setFormStep(1.5); // If "Other" is selected, go to custom input step
    } else {
      setFormStep(2); // Otherwise, proceed as usual
    }
  };  

  const [assessmentWeights, setAssessmentWeights] = useState({});
  const [totalWeight, setTotalWeight] = useState(0);
  // State to store weight validation errors
  const [weightError, setWeightError] = useState("");
  // State to track if user attempted to proceed without meeting conditions
  const [attemptedNext, setAttemptedNext] = useState(false);

  /**
   * Handles weight input changes for each assessment.
   * Ensures input is parsed as a number and updates the total weight accordingly.
   */
  const handleWeightChange = (assessment, value) => {
    let weight = parseFloat(value) || 0; // Convert input to a number, default to 0 if empty
    let newWeights = { ...assessmentWeights, [assessment]: weight }; // Update specific assessment weight

    let sum = Object.values(newWeights).reduce((acc, val) => acc + val, 0); // Calculate total weight

    setAssessmentWeights(newWeights); // Update state with new weights
    setTotalWeight(sum); // Update total weight state
  };

  const handleCustomAssessmentChange = (index, value) => {
    const updatedCustoms = [...customAssessments];
    updatedCustoms[index] = value;
    setCustomAssessments(updatedCustoms);
  };
  
  // Function to add another custom input field
  const addCustomAssessment = () => {
    setCustomAssessments([...customAssessments, ""]);
  };  

  const location = useLocation();
  const course = location.state?.course;

  useEffect(() => {

    console.log(course)
  })

  const reviews = [
    {
      title: "Comprehensive & Engaging",
      semester: "Spring 2025",
      reviewer: "Alex Johnson",
      date: "April 12, 2025",
      content:
        "I absolutely loved this course! The lectures were clear and well‑paced, "
      + "and the homework assignments really helped me solidify tough concepts. "
      + "Professor Lee was always available during office hours, which made a huge difference. "
      + "Highly recommend to anyone looking to deepen their understanding of this subject.",
    },
    // keep placeholders for reviews 2 & 3:
    {
      title: "Review Title 2",
      semester: "Fall 2024",
      reviewer: "Reviewer Name",
      date: "Date",
      content: "",
    },
    {
      title: "Review Title 3",
      semester: "Fall 2024",
      reviewer: "Reviewer Name",
      date: "Date",
      content: "",
    },
  ];


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
          {course ? (
            <>
              <h1 className="text-4xl font-bold text-gray-900">{course.course_code}</h1>
              <p className="text-2xl text-gray-700">{course.name}</p>
            </>
          ) : (
            <p className="text-gray-600">Course info unavailable</p>
          )}

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
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Fall 2024</li>
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Spring 2024</li>
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
            {reviews.map((review, idx) => (
              <div key={idx} className="p-4 bg-white shadow rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg">{review.title}</h3>
                <p className="text-xs text-gray-500">{review.semester}</p>
                <p className="text-sm text-gray-600">{review.reviewer}</p>
                <p className="text-xs text-gray-400">{review.date}</p>
                {review.content && (
                  <p className="mt-2 text-gray-700">{review.content}</p>
                )}
              </div>
            ))}
          </div>
        </section>


        {/* Submit Course Stats Form */}
        <section className="bg-blue-100 p-6 rounded-lg border border-yellow-500 mt-8">
          <h2 className="text-2xl font-bold text-center">Submit Course Statistics</h2>
          <p className="text-gray-700 text-center">Share your experience and course details</p>

          {formStep === 0 && (
            <div className="mt-8 max-w-md mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900">Ready to Submit Course Statistics?</h3>
              <p className="mt-2 text-gray-600">Click below to start the questionnaire about this class.</p>
              <button
                onClick={() => setFormStep(0.5)}
                className="mt-6 px-6 py-2 bg-black text-white rounded"
              >
                Start
              </button>
            </div>
          )}

          {formStep === 0.5 && (
            <div className="mt-8 max-w-md mx-auto text-center">
              <h3 className="text-lg font-semibold text-gray-900">Was a textbook required for this course?</h3>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={() => {
                    setUsesTextbook(true);
                    setFormStep(1);
                  }}
                  className="px-6 py-2 bg-green-600 text-white rounded"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setUsesTextbook(false);
                    setFormStep(1);
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded"
                >
                  No
                </button>
              </div>
            </div>
          )}

          {formStep === 1 && (
            <div className="mt-4 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900">What is counted for a grade?</h3>
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

                    {selectedAssessments[assessment] && assessment !== "Final Exam" && assessment !== "Other" && (
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

          {formStep === 1.5 && (
            <div className="mt-4 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900">Add Custom Grading Categories</h3>
              <p className="mt-2 text-gray-600">Since you selected "Other," enter the name(s) of your additional grading components.</p>

              <div className="space-y-2 mt-3">
                {customAssessments.map((custom, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder={`Custom Assessment ${index + 1}`}
                    value={custom}
                    onChange={(e) => handleCustomAssessmentChange(index, e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                ))}

                {customAttemptedNext && customAssessments.some(name => !name.trim()) && (
                  <p className="mt-2 text-red-600">
                    Error: Please fill in all custom assessment names.
                  </p>
                )}
              </div>

              <button
                onClick={addCustomAssessment}
                className="mt-3 px-3 py-1 bg-gray-300 text-gray-800 rounded"
              >
                + Add Another
              </button>

              <button
                onClick={() => {
                  setCustomAttemptedNext(true);
                  const hasInvalid = customAssessments.some(name => !name.trim());
                  if (!hasInvalid) {
                    setFormStep(2);
                  }
                }}
                className="w-full px-4 py-2 mt-4 bg-black text-white rounded"
              >
                Next
              </button>
            </div>
          )}

          {formStep === 2 && (
            <div className="mt-4 max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900">Distribute the weight for each category</h3>
              <p className="mt-2 text-gray-600">Total must equal 100%.</p>

              <div className="space-y-3 mt-4">
                {[...Object.keys(selectedAssessments).filter(a => a !== "Other"), ...customAssessments].map((assessment, index) =>
                  assessment && (
                    <div key={index} className="flex justify-between items-center">
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
                  )
                )}

              </div>

              {/* Show errors only if user attempts to proceed */}
              {attemptedNext && totalWeight !== 100 && (
                <p className="mt-2 text-red-600">
                  {totalWeight > 100
                    ? "Error: Total weight exceeds 100%. Adjust your entries."
                    : "Error: Total weight is less than 100%. Make sure all fields add up to 100%."}
                </p>
              )}

              {/* Warning if total weight exceeds 100% and some fields are empty */}
              {attemptedNext && totalWeight > 100 && Object.values(assessmentWeights).some((val) => isNaN(val) || val === 0) && (
                <p className="mt-1 text-red-600">Error: Some fields are empty while total weight exceeds 100%.</p>
              )}

              {/* Warning if total is 100% but some fields are still empty */}
              {attemptedNext && totalWeight === 100 && Object.keys(selectedAssessments).filter(a => a !== "Other").some(
                (assessment) => selectedAssessments[assessment] && (isNaN(assessmentWeights[assessment]) || assessmentWeights[assessment] === "")
              ) && (
                <p className="mt-1 text-red-600">Error: Some fields are empty. Fill in all fields before proceeding.</p>
              )}

              {attemptedNext && Object.keys(selectedAssessments).filter(a => a !== "Other").some(
                (assessment) => selectedAssessments[assessment] && assessmentWeights[assessment] <= 0
              ) && (
                <p className="mt-1 text-red-600">Error: All values must be greater than 0. Please correct your inputs.</p>
              )}

              {/* Next button to proceed to Step 3 */}
              <button
                onClick={() => {
                  setAttemptedNext(true); // User attempted to proceed

                  // Check if any selected field is empty, 0, or negative
                  const hasInvalidFields = Object.keys(selectedAssessments).filter(a => a !== "Other").some(
                    (assessment) => 
                      selectedAssessments[assessment] && 
                      (isNaN(assessmentWeights[assessment]) || assessmentWeights[assessment] === "" || assessmentWeights[assessment] <= 0)
                  );                  

                  if (totalWeight === 100 && !hasInvalidFields) {
                    setFormStep(3); // Move to the next step only if valid
                  }
                }}
                className="w-full px-4 py-2 mt-4 bg-black text-white rounded"
              >
                Next
              </button>

            </div>
          )}
          {formStep === 3 && (
            <div className="mt-8 max-w-md mx-auto text-center">
              <h3 className="text-2xl font-bold text-gray-900">
                Thank you for submitting your feedback!
              </h3>
            </div>
          )}

        </section>

      </div>
    </div>
  );
};

export default CoursePage;
