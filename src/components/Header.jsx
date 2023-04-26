import { Link } from "react-router-dom";
import Food from "../assets/Food.jpg";
import "./header.css";

const Header = () => {
  return (
    <header>
      <div className="left-side">
        <h1>Little Lemon</h1>
        <h2>Chicago</h2>
        <p>
          We are of an Indian restaurant, focused on traditional recipes served
          with a modern twist.
        </p>
        <button>
          <Link to="/booking">Reserve a table</Link>
        </button>
      </div>
      <div className="right-side">
        <img
          src={Food}
          alt="our cook holding a tablet with delicious baguettes"
        />
      </div>
    </header>
  );
};

export default Header;
