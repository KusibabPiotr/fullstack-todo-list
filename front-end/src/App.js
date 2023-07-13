import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import ListTasksComponent from "./components/ListTasksComponent";
import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <div>
      <HeaderComponent />
      <div className="container">
        <ListTasksComponent />
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
