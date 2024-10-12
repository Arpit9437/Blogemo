import { Link} from "react-router-dom";
import logo from "../assets/logo1.png";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4 py-1 shadow-md">
      <Link to='/'><img src={logo} className="object-scale-down h-16 w-48" ></img></Link>
      <div className="flex justify-between items-center gap-5">
        <Link to="/register" className="bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 text-white font-bold py-1.5 px-4 rounded-full border border-blue-500">Sign Up</Link>
        <Link to="/login" className="bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 text-white font-bold py-1.5 px-5 rounded-full border border-blue-500">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
