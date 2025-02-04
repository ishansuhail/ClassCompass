import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoursePage from "./pages/CourseReview"; // Import Course Review Page
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src="/logo.png" alt="ClassCompass Logo" className="w-12 h-12 mr-4" />
        <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        {/* Define Routes */}
        <Routes>
          <Route path="/CourseReview" element={<CoursePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
