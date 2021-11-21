import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Characters = ({ name, setName }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const setFilter2 = (name) => {
    let nameGo = `?name=${name}`;
    return nameGo;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/characters" + setFilter2(name)
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [name]);

  return isLoading ? (
    <span>Loading all characters...</span>
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
          {data.results.map((characters) => {
            return (
              <>
                <Link to={`/comics/${characters._id}`}>
                  <div key={characters._id} className="character-card">
                    <h3>{characters.name}</h3>
                    <img
                      src={`${characters.thumbnail.path}.${characters.thumbnail.extension}`}
                      alt={`${characters.name}`}
                    />
                    {characters.description ? (
                      <p>{characters.description}</p>
                    ) : (
                      <p>No description available.</p>
                    )}
                  </div>
                </Link>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Characters;
