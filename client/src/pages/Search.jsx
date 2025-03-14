import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ClassCompass() {
  const [search, setSearch] = useState("");
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Accordion states
  const [openCourseCode, setOpenCourseCode] = useState(false);
  const [openCourseLevel, setOpenCourseLevel] = useState(false);
  const [openTerm, setOpenTerm] = useState(false);
  const [openYear, setOpenYear] = useState(false);
  const [openSchool, setOpenSchool] = useState(false);

  // Filter states
  const [courseCodeFilter, setCourseCodeFilter] = useState(false);
  
  const [courseLevelFilters, setCourseLevelFilters] = useState({
    '1XXX': false,
    '2XXX': false,
    '3XXX': false,
    '4XXX': false
  });
  
  const [termFilters, setTermFilters] = useState({
    'Spring': false,
    'Fall': false
  });
  
  const [yearFilters, setYearFilters] = useState({
    '2023': false,
    '2024': false,
    '2025': false
  });
  
  const [schoolFilters, setSchoolFilters] = useState({
    'HASS': false,
    'Architecture': false,
    'Lally School of Business': false,
    'School of Science': false,
    'School of Engineering': false
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search }),
      });
      const { data } = await response.json();
      const topResults = data.slice(0, 10);
      setClasses(topResults);
      setFilteredClasses(topResults);
    };

    fetchResults();
  }, [search]);

  // Handler functions for each filter type
  const handleCourseLevelChange = (level) => {
    setCourseLevelFilters({
      ...courseLevelFilters,
      [level]: !courseLevelFilters[level]
    });
  };

  const handleTermChange = (term) => {
    setTermFilters({
      ...termFilters,
      [term]: !termFilters[term]
    });
  };

  const handleYearChange = (year) => {
    setYearFilters({
      ...yearFilters,
      [year]: !yearFilters[year]
    });
  };

  const handleSchoolChange = (school) => {
    setSchoolFilters({
      ...schoolFilters,
      [school]: !schoolFilters[school]
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setCourseCodeFilter(false);
    setCourseLevelFilters({
      '1XXX': false,
      '2XXX': false,
      '3XXX': false,
      '4XXX': false
    });
    setTermFilters({
      'Spring': false,
      'Fall': false
    });
    setYearFilters({
      '2023': false,
      '2024': false,
      '2025': false
    });
    setSchoolFilters({
      'HASS': false,
      'Architecture': false,
      'Lally School of Business': false,
      'School of Science': false,
      'School of Engineering': false
    });
    
    // Reset to original results
    setFilteredClasses(classes);
  };

  // Apply filters
  const applyFilters = () => {
    let results = [...classes];
    
    // Filter by course level
    const selectedLevels = Object.entries(courseLevelFilters)
      .filter(([_, isSelected]) => isSelected)
      .map(([level]) => level);
      
    if (selectedLevels.length > 0) {
      results = results.filter(course => {
        const courseLevel = course.course_code.match(/\d{1}/)?.[0] + 'XXX';
        return selectedLevels.includes(courseLevel);
      });
    }
    
    // Filter by term
    const selectedTerms = Object.entries(termFilters)
      .filter(([_, isSelected]) => isSelected)
      .map(([term]) => term);
      
    if (selectedTerms.length > 0) {
      results = results.filter(course => 
        selectedTerms.includes(course.semester.split(' ')[0])
      );
    }
    
    // Filter by year
    const selectedYears = Object.entries(yearFilters)
      .filter(([_, isSelected]) => isSelected)
      .map(([year]) => year);
      
    if (selectedYears.length > 0) {
      results = results.filter(course => 
        selectedYears.includes(course.semester.split(' ')[1])
      );
    }
    
    // Filter by school
    const selectedSchools = Object.entries(schoolFilters)
      .filter(([_, isSelected]) => isSelected)
      .map(([school]) => school);
      
    if (selectedSchools.length > 0) {
      results = results.filter(course => 
        selectedSchools.includes(course.school)
      );
    }
    
    setFilteredClasses(results);
    setShowFilterPanel(false);
  };

  const goToCourseReveiw = (course) => {
    navigate('/CourseReview', { state: { course } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
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

      {/* Results Section */}
      <div className="mt-8 w-full max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 text-left">Search Results</h2>
            <p className="text-gray-600 text-left">Click any class to see more information</p>
          </div>
          <button
            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200"
            onClick={() => setShowFilterPanel(true)}
          >
            Add Filters
          </button>
        </div>

        {/* Class Cards */}
        <div className="mt-4 space-y-2">
          {filteredClasses.map((course) => (
            <div
              key={course.section_id}
              onClick={() => goToCourseReveiw(course)}
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

      {/* --- Filter Panel Drawer with Transition --- */}
      <div
        className={`
          fixed 
          top-0 
          right-0 
          h-full 
          w-80  /* Make panel wider */
          bg-white 
          shadow-xl 
          border-l 
          border-gray-300 
          z-50
          transform 
          transition-transform 
          duration-300 
          ease-out
          flex 
          flex-col 
          p-6
          items-center      /* Center content horizontally */
          ${showFilterPanel ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Panel Header */}
        <div className="flex justify-between items-center mb-6 w-full">
          <h3 className="text-2xl font-semibold">Filters</h3>
          <button
            className="text-gray-500 hover:text-gray-700 text-xl"
            onClick={() => setShowFilterPanel(false)}
          >
            Close
          </button>
        </div>

        {/* Filter Accordions */}
        <div className="w-full text-xl space-y-6 text-left">
          {/* 1) Course Code */}
          <div>
            <button
              onClick={() => setOpenCourseCode((prev) => !prev)}
              className="flex justify-between w-full items-center font-semibold"
            >
              <span>Course Code</span>
              <ChevronDown
                size={24}
                className={`transition-transform duration-200 ${
                  openCourseCode ? "rotate-180" : ""
                }`}
              />
            </button>
            {openCourseCode && (
              <div className="mt-2 ml-2">
                <label className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5"
                    checked={courseCodeFilter}
                    onChange={() => setCourseCodeFilter(!courseCodeFilter)}
                  />
                  <span>Filter by Course Code</span>
                </label>
              </div>
            )}
          </div>

          {/* 2) Course Level */}
          <div>
            <button
              onClick={() => setOpenCourseLevel((prev) => !prev)}
              className="flex justify-between w-full items-center font-semibold"
            >
              <span>Course Level</span>
              <ChevronDown
                size={24}
                className={`transition-transform duration-200 ${
                  openCourseLevel ? "rotate-180" : ""
                }`}
              />
            </button>
            {openCourseLevel && (
              <div className="mt-2 ml-2 space-y-2">
                {Object.keys(courseLevelFilters).map((level) => (
                  <label key={level} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5"
                      checked={courseLevelFilters[level]}
                      onChange={() => handleCourseLevelChange(level)}
                    />
                    <span>{level}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 3) Term */}
          <div>
            <button
              onClick={() => setOpenTerm((prev) => !prev)}
              className="flex justify-between w-full items-center font-semibold"
            >
              <span>Term</span>
              <ChevronDown
                size={24}
                className={`transition-transform duration-200 ${
                  openTerm ? "rotate-180" : ""
                }`}
              />
            </button>
            {openTerm && (
              <div className="mt-2 ml-2 space-y-2">
                {Object.keys(termFilters).map((term) => (
                  <label key={term} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5"
                      checked={termFilters[term]}
                      onChange={() => handleTermChange(term)}
                    />
                    <span>{term}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 4) Year */}
          <div>
            <button
              onClick={() => setOpenYear((prev) => !prev)}
              className="flex justify-between w-full items-center font-semibold"
            >
              <span>Year</span>
              <ChevronDown
                size={24}
                className={`transition-transform duration-200 ${
                  openYear ? "rotate-180" : ""
                }`}
              />
            </button>
            {openYear && (
              <div className="mt-2 ml-2 space-y-2">
                {Object.keys(yearFilters).map((year) => (
                  <label key={year} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5"
                      checked={yearFilters[year]}
                      onChange={() => handleYearChange(year)}
                    />
                    <span>{year}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* 5) School */}
          <div>
            <button
              onClick={() => setOpenSchool((prev) => !prev)}
              className="flex justify-between w-full items-center font-semibold"
            >
              <span>School</span>
              <ChevronDown
                size={24}
                className={`transition-transform duration-200 ${
                  openSchool ? "rotate-180" : ""
                }`}
              />
            </button>
            {openSchool && (
              <div className="mt-2 ml-2 space-y-2">
                {Object.keys(schoolFilters).map((school) => (
                  <label key={school} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5"
                      checked={schoolFilters[school]}
                      onChange={() => handleSchoolChange(school)}
                    />
                    <span>{school}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Apply/Reset Buttons */}
        <div className="mt-auto pt-8 w-full">
          <button 
            className="w-full py-3 mb-2 border rounded hover:bg-gray-100 text-xl"
            onClick={applyFilters}
          >
            Apply Filters
          </button>
          <button 
            className="w-full py-3 border rounded hover:bg-gray-100 text-xl"
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
}
