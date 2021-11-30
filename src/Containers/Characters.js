import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import image from "../Assets/Images/question-marks.jpeg";

const Characters = ({ name, setName }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const setFilter2 = (name) => {
    let nameGo = `?name=${name}`;
    return nameGo;
  };

  const pageFilter = (page) => {
    let pageGo = `&page=${page}`;
    return pageGo;
  };

  const handleNextPage = () => {
    return setPage(page + 1);
  };

  const handlePrevPage = () => {
    return setPage(page - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pascal-marvel-api.herokuapp.com/characters" +
            setFilter2(name) +
            pageFilter(page)
        );

        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [name, page]);

  return isLoading ? (
    <body
      style={{
        backgroundColor: "rgb(29, 27, 27)",
        height: "1000px",
        color: "white",
      }}
    >
      Loading all characters...
    </body>
  ) : (
    <>
      <div>
        <div className="characters">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for Marvel Characters"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="page-chooser">
            {page !== 1 && (
              <button
                onClick={() => {
                  handlePrevPage();
                }}
              >
                Previous Page
              </button>
            )}
            <button
              onClick={() => {
                handleNextPage();
              }}
            >
              Next Page
            </button>
          </div>
          {data.results.map((characters) => {
            return (
              <>
                <div>
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
                </div>
              </>
            );
          })}
          <div className="page-chooser">
            {page !== 1 && (
              <button
                onClick={() => {
                  handlePrevPage();
                }}
              >
                Previous Page
              </button>
            )}
            <button
              onClick={() => {
                handleNextPage();
              }}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Characters;
