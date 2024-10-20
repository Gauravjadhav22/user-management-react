import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
console.log(user,isAuthenticated);
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white font-bold text-xl">USER MANAGEMENT</Link>
        <div>
          {isAuthenticated ? (
            <>
              <span className="text-white mr-4">Welcome, {user?.firstName}</span>
              <button onClick={logout} className="text-white mr-4">Logout</button>
            </>
          ) : (
            <>
              <Link to="/" className="text-white mr-4">Login</Link>
              <Link to="/register" className="text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
