import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import ListTasksComponent from "./components/ListTasksComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListEmployeeComponent}></Route>
            <Route path="/tasks" component={ListEmployeeComponent}></Route>
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
