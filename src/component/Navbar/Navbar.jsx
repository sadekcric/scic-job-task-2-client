import { Link } from "react-router-dom";
import Login from "./Login";
import Registration from "./Registration";

const Navbar = () => {
  return (
    <div className="bg-gray-600 text-white">
      <div className="lg:w-4/5 p-3 mx-auto py-3 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl ">
            <span className="text-yellow-400">ABC</span> Shop
          </h1>
        </Link>
        <div className="flex gap-5 text-lg font-semibold">
          <button>
            <Link to="/login">Login</Link>
          </button>
          <button>
            <Link to="/register">Registration</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
