import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CoursePage from "./pages/CourseReview";
import Search from "./pages/Search";
import Home from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">

        {/* Define Routes */}
        <Routes>
          <Route path="/CourseReview" element={<CoursePage />} />
          <Route path="/Search" element={<Search/>} />
          <Route path="/Home" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
