import "./App.css";
import SearchHeader from "./components/SearchHeader";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="search-header-spacing">
      <SearchHeader />
      <Outlet />
    </div>
  );
}

export default App;
