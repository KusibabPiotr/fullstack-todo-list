import React from "react";

export default function FooterComponent() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="footer">
        <span>All Rights Reserved {currentYear}</span>
      </footer>
    </div>
  );
}
