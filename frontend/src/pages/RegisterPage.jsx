import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const RegisterPage = () => {
  const[name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const{register,error} = useAuthStore();

  const handleSignup = async (e) => {
    e.preventDefault();
    try{
      await register(email,password,name);
      navigate("/");
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className="bg-gray-50 font-poppins">
      <div className=" flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign Up
            </h2>
            <form className="mt-8 space-y-4" onSubmit={handleSignup}>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">Name</label>
                <div className="relative flex items-center">
                  <input
                    name="name"
                    type="text"
                    value = {name}
                    onClick = {(e) => setName(e.target.value)}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>
              </div>
              {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Register
                </button>
              </div>
              <p className="text-gray-800 text-sm !mt-8 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-500 hover:text-blue-400"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
