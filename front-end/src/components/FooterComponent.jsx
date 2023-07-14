import React from "react";

export default function FooterComponent() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <span>All Rights Reserved {currentYear}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
