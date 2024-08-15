const Login = () => {
  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
  };
  return (
    <div className=" mx-auto min-h-screen flex  flex-col  items-center justify-center">
      <h2 className="text-center text-4xl font-semibold text-gray-800">Login</h2>
      <form onSubmit={handleLogin} className="text-gray-800 lg:w-1/4 p-3">
        <div>
          <h4>Your Email</h4>
          <input type="email" name="email" required className="py-2 px-3 rounded-md mb-3 border-gray-800 border w-full" />
        </div>
        <div>
          <h4>Your Password</h4>
          <input type="password" name="password" required className="py-2 px-3 rounded-md border-gray-800 border w-full" />
        </div>
        <button className="w-full bg-gray-700 text-white rounded-md mt-6 py-3" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
