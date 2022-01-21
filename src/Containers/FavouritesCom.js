import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FavouritesCom = ({ fav, removeFav }) => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const favCookies = Cookies.get("fav");

  const favTab = JSON.parse(favCookies);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://pascal-marvel-api.herokuapp.com/favouritescom",
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
      Loading your favourite comic books...
    </div>
  ) : (
    <>
      <div className="comics">
        <div className="page-chooser2">
          <h3>MY FAVOURITE COMIC BOOKS:</h3>
        </div>
        {data.length !== 0 ? (
          data.map((comics) => {
            return (
              <div key={comics._id} className="comics-card">
                <img
                  src={`${comics.thumbnail.path}.${comics.thumbnail.extension}`}
                  alt={`${comics.name}`}
                />
                <h4>{comics.title}</h4>
                {comics.description ? (
                  <p>{comics.description}</p>
                ) : (
                  <p>No description available.</p>
                )}
                <span
                  style={{
                    color: "#e93f33",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: "Bangers",
                    fontSize: "20px",
                    marginBottom: "3%",
                  }}
                  onClick={() => {
                    removeFav(comics._id);
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

export default FavouritesCom;
