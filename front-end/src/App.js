import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import ListTasksComponent from "./components/ListTasksComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<ListTasksComponent />}></Route>
            <Route path="/tasks" element={<ListTasksComponent />}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
