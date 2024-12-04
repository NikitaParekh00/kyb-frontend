import React, { useState } from 'react';
import './Layout.css';

const Layout = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Append the query parameter to the URL
      const response = await fetch(`http://localhost:3001/api/kyb?membershipNumber=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Get the Content-Disposition header to extract the filename
      const contentDisposition = response.headers.get("Content-Disposition");

      // Regular expression to extract the filename from the Content-Disposition header
      const filenameMatch = contentDisposition?.match(/filename="([^"]+)"/);
      const filename = filenameMatch ? filenameMatch[1] : `Polling_Booth_${query}.pdf`; // Fallback filename

      // Convert the response to a blob (for file downloads)
      const blob = await response.blob();

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename; // Use the extracted filename
      link.click(); // Programmatically click the link to trigger the download

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
        <div className="form-group" style={{ padding: "10px 0px" }}>
          <button type="submit" className="form-button">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Layout;
