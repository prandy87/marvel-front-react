import axios from "axios";
import { useState, useEffect } from "react";

const Comics = ({ title, setTitle }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const setFilter = (title) => {
    let titleGo = `?title=${title}`;
    return titleGo;
  };
  console.log(setFilter(title));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pascal-marvel-api.herokuapp.com/comics" + setFilter(title)
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [title]);

  return isLoading ? (
    <span>Loading list of comic books...</span>
  ) : (
    <>
      <div className="container">
        <div className="comics">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for Marvel Comic Books"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          {data.results.map((comics) => {
            return (
              <>
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
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Comics;
