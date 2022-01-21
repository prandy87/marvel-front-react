import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useState } from "react";
import Cookies from "js-cookie";

import Header from "./Components/Header";
import Characters from "./Containers/Characters";
import Comics from "./Containers/Comics";
import Character from "./Containers/Character";
import Favourites from "./Containers/Favourites";
import FavouritesCom from "./Containers/FavouritesCom";
import SignUp from "./Containers/SignUp";
import LogIn from "./Containers/LogIn";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

library.add(faHeart, farHeart, faTimes);

function App() {
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  let cookie = Cookies.get("fav");
  const [fav, setFav] = useState((cookie && JSON.parse(cookie)) || [[], []]);

  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username" || ""));

  const onLogin = (token, username) => {
    setToken(token);
    setUsername(username);
    Cookies.set("token", token);
    Cookies.set("username", username);
  };

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

  const addFavCom = (id) => {
    let favCopy = [...fav];
    if (favCopy[1].indexOf(id) === -1) {
      favCopy[1].push(id);
      alert("Book added to your favourites!");
    } else {
      alert("Book already in your favourites!");
    }
    setFav(favCopy);
    Cookies.set("fav", JSON.stringify(favCopy));
  };

  const removeFav = (id) => {
    const fav = Cookies.get("fav");
    const tabFav = fav && JSON.parse(fav);
    let newFav = [[], []];
    for (let i = 0; i < tabFav.length; i++) {
      for (let j = 0; j < tabFav[i].length; j++) {
        if (i === 0) {
          if (tabFav[i][j] !== id) {
            newFav[0].push(tabFav[i][j]);
          }
        } else {
          if (tabFav[i][j] !== id) {
            newFav[1].push(tabFav[i][j]);
          }
        }
      }
    }
    setFav(newFav);
    Cookies.set("fav", JSON.stringify(newFav));
  };

  return (
    <Router>
      <Header cookie={cookie} />
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
          element={
            <Comics title={title} setTitle={setTitle} addFavCom={addFavCom} />
          }
        />
        <Route path={"/comics/:characterId"} element={<Character />} />
        <Route
          path={"/favourites"}
          element={<Favourites fav={fav} removeFav={removeFav} />}
        />
        <Route
          path={"/favouritescom"}
          element={<FavouritesCom fav={fav} removeFav={removeFav} />}
        />
        <Route path={"/signup"} element={<SignUp onLogin={onLogin} />} />
        <Route path={"/login"} element={<LogIn onLogin={onLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
