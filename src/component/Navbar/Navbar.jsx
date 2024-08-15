import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="bg-gray-600 text-white">
      <div className="lg:w-4/5 p-3 mx-auto py-3 flex justify-between items-center">
        <Link>
          <h1 className="text-3xl ">
            <span className="text-yellow-400">ABC</span> Shop
          </h1>
        </Link>

        {user ? (
          <>
            <div className="flex gap-5 text-lg font-semibold">
              <button>
                <img src={user?.photoURL} alt="" className="w-10 h-10 rounded-full" />
              </button>
              <button onClick={() => logOut()}>
                <h4>Logout</h4>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-5 text-lg font-semibold">
              <button>
                <Link to="/">Login</Link>
              </button>
              <button>
                <Link to="/register">Registration</Link>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
