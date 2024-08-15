import Login from "./Login";
import Registration from "./Registration";

const Navbar = () => {
  return (
    <div className="bg-gray-600 text-white">
      <div className="lg:w-4/5 p-3 mx-auto py-3 flex justify-between items-center">
        <div>
          <h1 className="text-3xl ">
            <span className="text-yellow-400">ABC</span> Shop
          </h1>
        </div>
        <div className="flex gap-5 text-lg font-semibold">
          <button onClick={() => document.getElementById("my_modal_2").showModal()}>Login</button>
          <Login />

          <button onClick={() => document.getElementById("my_modal_3").showModal()}>Registration</button>
          <Registration />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
