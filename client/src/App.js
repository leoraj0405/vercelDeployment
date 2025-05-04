import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./UserList";
import AddUser from "./AddUser";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;
