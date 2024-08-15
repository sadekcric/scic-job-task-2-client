import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const { firebaseRegister, user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (user) {
    return navigate("/products");
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    const conformPassword = e.target.conformPassword.value;

    if (password !== conformPassword) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password not Matched!",
      });
    }

    firebaseRegister(email, password)
      .then((res) => {
        if (res.user) {
          updateProfile(res.user, {
            displayName: name,
            photoURL: photo,
          });
          Swal.fire({
            icon: "success",
            title: "Registered",
            text: "Registration Successful",
          });
          // navigate("/products");
          console.log(res.user);
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className=" mx-auto min-h-screen flex  flex-col  items-center justify-center">
      <h2 className="text-center text-4xl font-semibold text-gray-800">Registration</h2>

      <form onSubmit={handleRegister} className="text-gray-800 lg:w-1/4 p-3">
        <div>
          <h4>Your Name</h4>
          <input type="text" name="name" required className="py-2 px-3 rounded-md mb-3 border-gray-800 border w-full" />
        </div>
        <div>
          <h4>Your Email</h4>
          <input type="email" name="email" required className="py-2 px-3 rounded-md mb-3 border-gray-800 border w-full" />
        </div>
        <div>
          <h4>Your Photo URL</h4>
          <input type="text" name="photo" required className="py-2 px-3 rounded-md mb-3 border-gray-800 border w-full" />
        </div>
        <div>
          <h4>Your Password</h4>
          <input type="password" name="password" required className="py-2 px-3 rounded-md border-gray-800 border w-full mb-3" />
        </div>
        <div>
          <h4>Conform Password</h4>
          <input type="password" name="conformPassword" required className="py-2 px-3 rounded-md border-gray-800 border w-full" />
        </div>
        <button className="w-full bg-gray-700 text-white rounded-md mt-6 py-3" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
