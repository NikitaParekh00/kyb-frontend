import React, { useState } from 'react';
import './Layout.css';

const Layout = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      // Append the query parameter to the URL
      const response = await fetch(`https://kyb-backend.vercel.app/api/kyb?query=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("API Response:", data);
  
      // Perform further actions with the response data if needed
    } catch (error) {
      console.error("Error while calling API:", error);
    }
  };
  
  return (
    <div className="layout-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter your query"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="form-button">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Layout;