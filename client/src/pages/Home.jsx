export default function RPIClassCompass() {
    return (
      <div className="flex flex-col items-center p-6 space-y-6">
        <div className="text-center">
          <img src="/logo.png" alt="Logo" className="w-20 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">RPI ClassCompass</h1>
          <p className="text-gray-600">An RCOS Project</p>
        </div>
  
        <div className="bg-blue-100 border-yellow-400 border-2 p-4 rounded-lg w-full max-w-xl text-center">
          <p className="font-semibold">Insider information lives here...</p>
          <input
            type="text"
            placeholder="Input the name or course code of your class"
            className="mt-2 p-2 w-full border rounded-md"
          />
        </div>
  
        <div className="text-center">
          <h2 className="text-lg font-semibold">Course Categories</h2>
          <p className="text-gray-500">Click a course category to start searching!</p>
        </div>
  
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-2xl">
          {[
            "Architecture",
            "Engineering",
            "Science",
            "Interdisciplinary & Other",
            "Management",
          ].map((category) => (
            <div
              key={category}
              className="p-4 text-center border-2 border-yellow-400 rounded-lg cursor-pointer hover:bg-yellow-100"
            >
              {category}
            </div>
          ))}
        </div>
      </div>
    );
  }
  