import logo from "../Assets/Images/Marvel_Logo.svg.png";
import { Link } from "react-router-dom";

const Header = () => {
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
          <Link to={"/favourites"}>
            <button style={{ marginLeft: "300px" }}>My Favourites</button>
          </Link>
        </span>
      </div>
    </>
  );
};

export default Header;
