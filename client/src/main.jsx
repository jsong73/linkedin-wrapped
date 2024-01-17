import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import ProfileCard from "./components/ProfileCard.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
        {/* <Route path="/profile" element={ <ProfileCard /> }/> */}
        <Route path="/" element={ <App /> } />
      </Routes>
  </Router>
)
