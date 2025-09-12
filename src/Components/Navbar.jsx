import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Components/AuthContext";
import { Menu, X, Home as HomeIcon, UserPlus, Shield } from "lucide-react";

export default function Navbar() {
  const  navigate =  useNavigate();  
  const { token } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

    
  const handleAdminClick = () => {
    if (token) {
      navigate("/admin");   // ✅ Already logged in → go to admin panel
    } else {
      navigate("/admin-login"); // ❌ Not logged in → go to login page
    }
  };

 return (
    <nav className="sticky top-0 z-50 bg-gray-900/50 backdrop-blur-md border-b border-gray-700 text-white transition-colors">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand + Desktop Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-white">
              <Shield className="w-5 h-5 text-blue-400" />
              <span>FranchiseHub</span>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-200 hover:text-white transition-colors"
              >
                <HomeIcon className="w-4 h-4" /> Home
              </Link>
            </div>
          </div>

          {/* Actions (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-blue-400 text-blue-200 bg-blue-900/30 hover:bg-blue-900/50 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span>User Register</span>
            </Link>
            <button
              onClick={handleAdminClick}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-green-700/70 hover:bg-green-700 text-white transition-colors"
            >
              <Shield className="w-4 h-4" /> Admin Panel
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-800/50 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden border-t border-gray-700 py-3 space-y-2 bg-gray-900/70 backdrop-blur-md">
            <Link
              to="/"
              className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-gray-800/50 transition-colors"
              onClick={() => setOpen(false)}
            >
              <HomeIcon className="w-4 h-4" /> Home
            </Link>
            <Link
              to="/register"
              className="flex items-center gap-2 px-2 py-2 rounded-md text-blue-200 hover:bg-blue-900/50 transition-colors"
              onClick={() => setOpen(false)}
            >
              <UserPlus className="w-4 h-4" /> User Register
            </Link>
            <button
              onClick={() => { setOpen(false); handleAdminClick(); }}
              className="w-full flex items-center gap-2 px-2 py-2 rounded-md bg-green-700/70 hover:bg-green-700 transition-colors"
            >
              <Shield className="w-4 h-4" /> Admin Panel
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}




  
  // return (
  //   <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
  //     <Link to="/" className="text-2xl font-bold text-blue-600">
  //       School Franchise
  //     </Link>

  //     <div className="flex gap-6">
  //       <Link
  //         to="/"
  //         className="text-gray-700 hover:text-blue-600 font-medium transition"
  //       >
  //         Home
  //       </Link>

        
        
        
          
        

  //         <Link
  //         to="/register"
  //         className="text-gray-700 hover:text-blue-600 font-medium transition"
  //       >
  //           User-Register
  //       </Link>

  //     </div>
  //   </nav>
  // );

