import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import ListTasksComponent from "./components/ListTasksComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateTaskComponent from "./components/CreateTaskComponent";
import UpdateTaskComponent from "./components/UpdateTaskComponent";
import ViewTaskComponent from "./components/ViewTaskComponent";

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
            <Route
              exact
              path="/view-task/:id"
              element={<ViewTaskComponent />}
            />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
