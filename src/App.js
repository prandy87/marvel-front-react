import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import Cookies from "js-cookie";

import Header from "./Components/Header";
import Characters from "./Containers/Characters";
import Comics from "./Containers/Comics";
import Character from "./Containers/Character";
import Favourites from "./Containers/Favourites";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

library.add(faHeart, farHeart, faTimes);

function App() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  let cookie = Cookies.get("fav");
  const [fav, setFav] = useState((cookie && JSON.parse(cookie)) || [[], []]);

  const addFav = (id) => {
    let favCopy = [...fav];
    if (favCopy[0].indexOf(id) === -1) {
      favCopy[0].push(id);
      alert("Added to your favourites!");
    } else {
      alert("Already in your favourites!");
    }

    setFav(favCopy);
    Cookies.set("fav", JSON.stringify(favCopy));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path={"/"}
          element={<Characters name={name} setName={setName} addFav={addFav} />}
        />
        <Route
          path={"/characters"}
          element={<Characters name={name} setName={setName} addFav={addFav} />}
        />
        <Route
          path={"/comics"}
          element={<Comics title={title} setTitle={setTitle} />}
        />
        <Route path={"/comics/:characterId"} element={<Character />} />
        <Route path={"/favourites"} element={<Favourites fav={fav} />} />
      </Routes>
    </Router>
  );
}

export default App;
