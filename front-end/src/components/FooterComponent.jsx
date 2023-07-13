import React from "react";

const FooterComponent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="footer">
        <span>All Rights Reserved {currentYear}</span>
      </footer>
    </div>
  );
};

export default FooterComponent;
