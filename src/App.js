import "./App.css";
import React, { useState, useEffect } from "react";
import { data } from "./Component/Db";
import Employees from "./Component/Employees";
import GroupedTeamMembers from "./Component/GroupedTeamMembers";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./Component/Nav";
import NotFound from "./Component/NotFound";

function App() {
  const [selectedTeam, setTeam] = useState(
    JSON.parse(localStorage.getItem("selectedTeam")) || "TeamB"
  );
  const [employees, setEmployees] = useState(
    JSON.parse(localStorage.getItem("employeeList")) || data
  );

  useEffect(() => {
    localStorage.setItem("employeeList", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("selectedTeam", JSON.stringify(selectedTeam));
  }, [selectedTeam]);

  function handleTeamSelectionChange(event) {
    setTeam(event.target.value);
  }

  function handleEmployeeCardClick(event) {
    const transformedEmployees = employees.map((employee) =>
      employee.id === parseInt(event.currentTarget.id)
        ? employee.teamName === selectedTeam
          ? { ...employee, teamName: "" }
          : { ...employee, teamName: selectedTeam }
        : employee
    );

    setEmployees(transformedEmployees);
  }

  return (
    <div className="App">
      <Router>
        <Nav />
        <Header
          selectedTeam={selectedTeam}
          teamMemberCount={
            employees.filter((employee) => employee.teamName === selectedTeam)
              .length
          }
        />
        <Routes>
          <Route
            path="/"
            element={
              <Employees
                employees={employees}
                selectedTeam={selectedTeam}
                handleEmployeeCardClick={handleEmployeeCardClick}
                handleTeamSelectionChange={handleTeamSelectionChange}
              />
            }
          ></Route>
          <Route
            path="/GroupedTeamMembers"
            element={
              <GroupedTeamMembers
                employees = {employees}
                selectedTeam = {selectedTeam}
                setTeam = {setTeam}
              />
            }
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
