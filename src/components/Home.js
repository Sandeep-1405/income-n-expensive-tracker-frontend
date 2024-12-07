import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css.css"; // Optional for additional custom styles
import HOC from "./HOC";

const Home = () => {
  const displayName = localStorage.getItem("displayName") || "Unknown User";
  const income = parseInt(localStorage.getItem("income") || 0);
  const expensive = parseInt(localStorage.getItem("expensive") || 0);

  const summary = income - expensive;

  // Function to display profit, loss, or break-even
  const summaryFun = () => {
    if (summary > 0) {
      return <h3 className="text-success fw-bold">Profit: ₹{summary}</h3>;
    } else if (summary < 0) {
      return <h3 className="text-danger fw-bold">Loss: ₹{Math.abs(summary)}</h3>;
    } else {
      return <h3 className="text-muted fw-bold">Break-even</h3>;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 bg-light p-4 shadow rounded text-center">
          {/* Welcome Message */}
          <h1 className="mb-4 display-6 text-primary">Welcome, {displayName}!</h1>

          {/* Income and Expenses Display */}
          <div className="row g-3 my-4">
            <div className="col-6">
              <div className="p-3 bg-success text-white rounded shadow-sm">
                <h4>Income</h4>
                <h2 className="fw-bold">₹{income}</h2>
              </div>
            </div>
            <div className="col-6">
              <div className="p-3 bg-danger text-white rounded shadow-sm">
                <h4>Expenses</h4>
                <h2 className="fw-bold">₹{expensive}</h2>
              </div>
            </div>
          </div>

          {/* Profit/Loss Summary */}
          <div>{summaryFun()}</div>
        </div>
      </div>
    </div>
  );
};

export default HOC(Home);
