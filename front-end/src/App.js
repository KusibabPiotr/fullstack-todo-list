import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import ListTasksComponent from "./components/ListTasksComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateTaskComponent from "./components/CreateTaskComponent";
import UpdateTaskComponent from "./components/UpdateTaskComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<ListTasksComponent />} />
            <Route exact path="/add-task" element={<CreateTaskComponent />} />
            <Route
              exact
              path="/update-task/:id"
              element={<UpdateTaskComponent />}
            />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
