import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import image from "../Assets/Images/question-marks.jpeg";

const Favourites = ({ fav, removeFav }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const favCookies = Cookies.get("fav");

  const favTab = JSON.parse(favCookies);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://pascal-marvel-api.herokuapp.com/favourites",
          { favTab: favTab }
        );

        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div
      style={{
        backgroundColor: "rgb(29, 27, 27)",
        height: "1000px",
        color: "white",
      }}
    >
      Loading your favourite characters...
    </div>
  ) : (
    <>
      <div className="characters">
        <div className="page-chooser2">
          <h3>MY FAVOURITE CHARACTERS:</h3>
        </div>
        {data.length !== 0 ? (
          data.map((characters) => {
            return (
              <div key={characters._id}>
                <Link to={`/comics/${characters._id}`}>
                  <div key={characters._id} className="character-card">
                    <h3>{characters.name}</h3>
                    <img
                      src={
                        `${characters.thumbnail.path}`.includes(
                          "image_not_available"
                        )
                          ? image
                          : `${characters.thumbnail.path}.${characters.thumbnail.extension}`
                      }
                      alt={`${characters.name}`}
                    />
                    {characters.description ? (
                      <p>{characters.description}</p>
                    ) : (
                      <p>No description available.</p>
                    )}
                  </div>
                </Link>
                <span
                  style={{
                    color: "#e93f33",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "Bangers",
                    fontSize: "20px",
                    marginTop: "10%",
                    marginBottom: "250px",
                  }}
                  onClick={() => {
                    removeFav(characters._id);
                  }}
                >
                  <FontAwesomeIcon icon="times" size={28} /> Remove from
                  {"     "}Favourites
                </span>
              </div>
            );
          })
        ) : (
          <div className="character-card">
            <h3>This section is empty</h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Favourites;
