import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import { useState } from "react";

import Header from "./Components/Header";
import Characters from "./Containers/Characters";
import Comics from "./Containers/Comics";
import Character from "./Containers/Character";

function App() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(100);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path={"/characters"}
          element={
            <Characters
              name={name}
              setName={setName}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          }
        />
        <Route
          path={"/comics"}
          element={<Comics title={title} setTitle={setTitle} />}
        />
        <Route path={"/comics/:characterId"} element={<Character />} />
      </Routes>
    </Router>
  );
}

export default App;
