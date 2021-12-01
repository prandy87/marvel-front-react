import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Favourites = ({ fav }) => {
  Cookies.get("fav");

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(
  //           "https://pascal-marvel-api.herokuapp.com/characters"
  //         );
  //       } catch (error) {
  //         console.log(error.message);
  //       }
  //     };
  //     fetchData();
  //   }, []);
  console.log(fav[0]);

  return (
    <>
      <h3>CHARACTERS:</h3>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {fav[0].map((item) => {
          return <div>{item}</div>;
        })}
      </div>
    </>
  );
};

export default Favourites;
