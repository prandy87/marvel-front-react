import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Character = () => {
  const { characterId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/comics/${characterId}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <>
      <div className="container">
        <div className="comics">
          {data.comics.map((elem) => {
            return (
              <>
                <div className="comics-card">
                  <img
                    src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                    alt={`${elem.name}`}
                  />
                  <h4>{elem.title}</h4>
                  {elem.description ? (
                    <p>{elem.description}</p>
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

export default Character;
