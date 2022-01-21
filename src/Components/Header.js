import logo from "../Assets/Images/Marvel_Logo.svg.png";
import { Link } from "react-router-dom";

const Header = ({ cookie }) => {
  return (
    <>
      <div className="header">
        <span className="logo-container">
          <Link to={"/"}>
            <img src={logo} alt="Marvel" />
          </Link>
        </span>
        <span className="header-clickers">
          <Link to={"/characters"}>
            <button>All Marvel Characters</button>
          </Link>
          <Link to={"/comics"}>
            <button>All Marvel Comic Books</button>
          </Link>
          {cookie ? (
            <button className="dropdown" style={{ marginLeft: "300px" }}>
              My Favourites
              <div className="dropdown-content">
                <Link to={"/favourites"}>
                  <p>Characters</p>
                  <span></span>
                </Link>
                <span></span>
                <Link to={"/favouritescom"}>
                  <p>Comics</p>
                </Link>
              </div>
            </button>
          ) : null}
        </span>
      </div>
    </>
  );
};

export default Header;
