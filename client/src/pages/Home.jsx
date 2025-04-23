import { categories } from './categories';
import { useNavigate } from 'react-router-dom';

export default function RPIClassCompass() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/Subject', { state: { category } });
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
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 text-left mb-2">Course Categories</h2>
          <p className="text-gray-600 text-lg text-left">
            Click any course category to start searching!
          </p>
        </div>

        {/* Masonry-style layout using columns */}
        <div className="mt-6 columns-1 sm:columns-2 md:columns-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="mb-8 break-inside-avoid bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              onClick={() => handleCategoryClick(cat)}
            >
              <div className="p-5 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{cat.name}</h3>
                <span className="text-sm font-medium text-gray-500">{cat.code}</span>
              </div>
              <div className="p-4">
                <div className="flex flex-col items-start space-y-2">
                  {cat.subLabels.map((sub) => {
                    const parts = sub.split(" - ");
                    return (
                      <button
                        key={sub}
                        className="w-full px-4 py-2.5 rounded-lg text-left group hover:bg-blue-50 transition-all duration-200"
                      >
                        <div className="flex items-center">
                          <span className="font-semibold text-blue-900 group-hover:text-blue-700 transition-colors">
                            {parts[0]}
                          </span>
                          {parts.length > 1 && (
                            <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                              {parts.slice(1).join(" - ")}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}