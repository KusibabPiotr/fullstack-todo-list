import React from "react";

const TASKS_API_BASE_URL = "http://localhost:3000";

export default function HeaderComponent() {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a href={TASKS_API_BASE_URL} className="navbar-brand">
              Tasks Management App
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}
