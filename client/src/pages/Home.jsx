import { useEffect, useState } from "react";

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

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <div className="text-center">
        <img src="/logo.png" alt="Logo" className="w-20 mx-auto mb-4" />
        <h1 className="text-3xl font-bold">RPI ClassCompass</h1>
        <p className="text-gray-600">An RCOS Project</p>
      </div>

      <div className="bg-blue-100 border-yellow-400 border-2 p-4 rounded-lg w-full max-w-xl text-center">
        <p className="font-semibold">Insider information lives here...</p>
        <div className="flex mt-2">
          <input
            type="text"
            placeholder="Input the name or course code of your class"
            className="p-2 w-full border rounded-md"
          />
          <button className="ml-2 px-4 py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500">
            Search
          </button>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-lg font-semibold">Course Categories</h2>
        <p className="text-gray-500">Click a course category to start searching!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {Object.entries(courseSubjects).map(([school, courses]) => (
          <div
            key={school}
            className="p-4 text-center border-2 border-yellow-400 rounded-lg"
          >
            <p className="font-semibold mb-2">{school}</p>
            <div className="flex flex-col space-y-2">
              {courses.map((course) => (
                <button
                  key={course}
                  className="w-full px-4 py-2 bg-blue-200 text-blue-800 rounded-md hover:bg-blue-300"
                >
                  {course}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
