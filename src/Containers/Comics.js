import axios from "axios";
import { useState, useEffect } from "react";

const Comics = ({ title, setTitle }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const setFilter = (title) => {
    let titleGo = `?title=${title}`;
    return titleGo;
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
          "https://pascal-marvel-api.herokuapp.com/comics" +
            setFilter(title) +
            pageFilter(page)
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [title, page]);

  return isLoading ? (
    <body
      style={{
        backgroundColor: "rgb(29, 27, 27)",
        height: "1000px",
        color: "white",
      }}
    >
      Loading all Comics...
    </body>
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

export default Comics;
