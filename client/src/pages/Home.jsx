export default function RPIClassCompass() {
  const categories = [
    {
      name: "Architecture",
      code: "ARCH",
      subLabels: ["ARCH - Architecture", "LGHT - Lighting"],
    },
    {
      name: "Engineering",
      code: "ENGR",
      subLabels: [
        "BMED - Biomedical Engineering",
        "CHME - Chemical Engineering",
        "CIVL - Civil Engineering",
        "ECSE - Electrical, Computer, and Systems Engineering",
        "ENGR - General Engineering",
        "ENVE - Environmental Engineering",
        "ESCI - Engineering Science",
        "ISYE - Industrial and Systems Engineering",
        "MANE - Mechanical, Aerospace, and Nuclear Engineering",
        "MTLE - Materials Science and Engineering",
      ],
    },
    {
      name: "Information Technology and Web Science",
      code: "ITWS",
      subLabels: ["ITWS - Information Technology and Web Science"],
    },
    {
      name: "Humanities, Arts, and Social Sciences",
      code: "HASS",
      subLabels: [
        "ARTS - Arts",
        "COGS - Cognitive Science",
        "COMM - Communication",
        "ECON - Economics",
        "GSAS - Games and Simulation Arts and Sciences",
        "IHSS - Interdisciplinary Humanities and Social Sciences",
        "INQR - HASS Inquiry",
        "LANG - Foreign Languages",
        "LITR - Literature",
        "PHIL - Philosophy",
        "PSYC - Psychology",
        "STSO - Science, Technology, and Society",
        "WRIT - Writing",
      ],
    },
    {
      name: "Uncategorized",
      code: "ILEA",
      subLabels: ["ILEA - Independent Learning Exper"],
    },
    {
      name: "Interdisciplinary & Other",
      code: "INTER",
      subLabels: [
        "ADMN - Administrative Courses",
        "USAF - Aerospace Studies (Air Force ROTC)",
        "USAR - Military Science (Army ROTC)",
        "USNA - Naval Science (Navy ROTC)",
      ],
    },
    {
      name: "Management",
      code: "MGMT",
      subLabels: ["BUSN - Business (H)", "MGMT - Management"],
    },
    {
      name: "Science",
      code: "SCI",
      subLabels: [
        "ASTR - Astronomy",
        "BCBP - Biochemistry and Biophysics",
        "BIOL - Biology",
        "CHEM - Chemistry",
        "CSCI - Computer Science",
        "ERTH - Earth and Environmental Science",
        "ISCI - Interdisciplinary Science",
        "MATH - Mathematics",
        "MATP - Mathematical Programming, Probability, and Statistics",
        "PHYS - Physics",
      ],
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
        <h1 className="text-4xl font-bold text-gray-900">RPI ClassCompass</h1>
        <p className="text-2xl text-gray-700 mt-2">Search for your class below</p>
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
          <h2 className="text-2xl font-semibold text-gray-900 text-left">Course Categories</h2>
          <p className="text-gray-600 text-left">
            Click any course category to start searching!
          </p>
        </div>

        {/* Masonry-style layout using columns */}
        <div className="mt-4 columns-1 sm:columns-2 md:columns-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="mb-6 break-inside-avoid border-2 border-yellow-500 p-4 rounded-lg transition-colors flex flex-col"
            >
              <h3 className="text-xl font-bold text-gray-900">{cat.name}</h3>
              <div className="mt-3 flex flex-col items-start space-y-2">
                {cat.subLabels.map((sub) => {
                  const parts = sub.split(" - ");
                  return (
                    <div
                      key={sub}
                      className="w-full border-2 border-yellow-500 px-4 py-2 rounded-full text-gray-700 text-sm hover:bg-yellow-50 cursor-pointer transition-colors text-left whitespace-normal"
                    >
                      <span className="font-bold">{parts[0]}</span>
                      {parts.length > 1 && (
                        <span> - {parts.slice(1).join(" - ")}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}