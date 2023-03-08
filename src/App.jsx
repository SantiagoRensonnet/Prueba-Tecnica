import { useState } from "react";

import Filter from "./components/Filter/Filter";
import Table from "./components/Table/Table";
import "./App.css";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("Title");
  const [inputValue, setInputValue] = useState("");
  const [token, setToken] = useState(
    localStorage.getItem("harry-potter-token")
  );

  return token ? (
    <div className="App">
      <Filter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilterOption={setFilterOption}
      />
      <Table
        filterOption={filterOption}
        searchTerm={searchTerm}
        token={token}
      />
    </div>
  ) : (
    <div>
      <h2>Por favor introduzca su clave</h2>
      <input
        type="text"
        name="inputValue"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={() => {
          setToken(inputValue);
          localStorage.setItem("harry-potter-token", inputValue);
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
