import { Link, Navigate, useNavigate} from "react-router-dom";
import logo from "../assets/logo1.png";
import { useAuthStore } from "../store/authStore";

const NavbarLogin = () => {
    const {logout} = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/");
    }
  return (
    <div className="flex justify-between items-center px-4 py-1 shadow-md">
      <Link to='/'><img src={logo} className="object-scale-down h-16 w-48" ></img></Link>
      <div className="flex justify-between items-center gap-5">
        <Link to="/createPost" className="bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 text-white font-bold py-1.5 px-4 rounded-full border border-blue-500">Create New Post</Link>
        <Link to="/logout" className="bg-blue-500 hover:bg-white hover:text-blue-500 hover:border-blue-500 text-white font-bold py-1.5 px-5 rounded-full border border-blue-500" onClick={handleLogout}>Logout</Link>
      </div>
    </div>
  );
};

export default NavbarLogin;
