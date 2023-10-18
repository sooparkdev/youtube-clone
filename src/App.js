import { useEffect, useState } from "react";
import "./App.css";
import SearchHeader from "./components/SearchHeader";
import { Outlet } from "react-router-dom";

// by default we fetch and show the hot trend, but as soon as the search is activated we fetch and show the search result

function App() {
  const [searchKeyword, setSearchKeyword] = useState();
  return (
    <div>
      <SearchHeader onSubmit={(keyword) => setSearchKeyword(keyword)} />
      <Outlet />
    </div>
  );
}

export default App;
