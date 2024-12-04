import React, { useState } from "react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./Layout.css";

const Layout = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generatePDF = (data) => {
    const doc = new jsPDF();

    // Add background image
    const img = new Image();
    img.src = "/img/kyb.jpeg"; // Replace with your image path
    img.onload = () => {
      // Add the image to the PDF as a background
     // Add background image starting a bit below the top (Y=20 for example)
  const imageHeight = 63; // Set the height for the top image
  const imageYPosition = 24; // Y position to start the image below the top margin
  const imageLeftMargin = 27; // Add some space on the left side (adjust this value as needed)

  doc.addImage(img, "JPEG", imageLeftMargin, imageYPosition, 175, imageHeight); // Image starting at Y = 20, with left margin

      // Title
      doc.setFont("helvetica", "bold"); // Set font to bold

      doc.setFontSize(16);
      doc.setTextColor(0); // Ensure text is visible over the background
      doc.text("Know Your Polling Booth Details", 105, 20, { align: "center" });
      

      // Define rows (no column headings)
      const rows = [
        ["Voter Serial No.:", data.voterSerialNo || "N/A"],
        ["Membership No.:", data.MRN || "N/A"],
        ["Name:", data.name || "N/A"],
        ["Location:", data.location || "N/A"],
        ["Booth No.:", data.boothNo || "N/A"],
        ["Booth Address:", data.address || "N/A"],
        ["Date:", data.date || "N/A"],
      ];

      // Add table with no column headings
      autoTable(doc, {
        body: rows, // Only rows data
        theme: "grid", // Use the "grid" theme for table lines
        styles: {
          fillColor: null, // Remove background color
          textColor: 0,    // Black text
          lineWidth: 0.1,  // Thinner lines for the table
          fontSize: 10,    // Adjust font size for better readability
        },
        startY: 30, // Start table after the title
        // margin: { left: 20 }, // Add left margin for better alignment
        columnStyles: {
          0: { cellWidth: 43,  fontStyle: "bold" }, // Fixed width for label column
          1: { cellWidth: 145 }, // Fixed width for value column
        },
        didDrawCell: (data) => {
            if (data.row.index === 3 && data.column.index === 1) {
                // Set the text color to blue for "Location" value
                doc.setTextColor(0, 0, 255); // Blue color
                // Redraw the cell's text with blue color
                
                doc.text(data.cell.text, data.cell.x + 1.8, data.cell.y + 4.9); // Adjust Y slightly if necessary, keeping it within the cell's bounds
            }
          },
      });

      // Save the PDF
      const tableBottomY = doc.autoTable.previous.finalY;

      // Set margin for the image to be placed below the table
      const imageMargin = 10; // Adjust this margin as needed
  
      // Add image at the bottom after the table ends
      const imageBottomY = tableBottomY + imageMargin;
  
      // Now add the image at the bottom of the table
      const bottomImg = new Image();
      bottomImg.src = "/img/kyb3.jpeg"; // Replace with your bottom image path
      bottomImg.onload = () => {
        doc.addImage(bottomImg, "JPEG", 14, imageBottomY, 188, 130); // Image dimensions and position
        // Save the PDF
        const filename = `Polling_Booth_${data.name}_${data.MRN || "Details"}.pdf`;
        doc.save(filename);
      };
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a valid membership number or mobile number.");
      return;
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await fetch(`https://kyb-backend.vercel.app/api/kyb?membershipNumber=${query}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("User not found or server error.");
      }

      const data = await response.json();
      generatePDF(data.data); // Generate PDF from the response data
    } catch (error) {
      setError("Failed to fetch details. Please try again.");
      console.error("Error while fetching API:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Membership Number or Mobile Number"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group" style={{ padding: "10px 0px" }}>
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Generating PDF..." : "Search"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Layout;
