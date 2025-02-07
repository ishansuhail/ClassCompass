import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoursePage from "./pages/CourseReview"; // Import Course Review Page
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">

        {/* Define Routes */}
        <Routes>
          <Route path="/CourseReview" element={<CoursePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
