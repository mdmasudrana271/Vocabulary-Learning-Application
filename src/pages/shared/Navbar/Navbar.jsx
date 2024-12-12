import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { FaUserAlt } from "react-icons/fa";
import useAdmin from "../../../Hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user.email);

  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-40"
          >
            {!isAdmin ? (
              <>
                <li>
                  <Link to="/userDashboard/lessons">Lessons</Link>
                </li>
                <li>
                  <Link to="/userDashboard/tutorial">Tutorial</Link>
                </li>
              </>
            ) : undefined}

            {user ? (
              <>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li onClick={logOut}>
                  <Link>Logout</Link>
                </li>
                <div className="flex items-center gap-2">
                  <li>{user?.displayName}</li>
                  {user.photoURL ? (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />
                  ) : (
                    <FaUserAlt></FaUserAlt>
                  )}
                </div>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          The <span className="text-success mr-1">Language</span> Master
        </a>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal p-0">
          {!isAdmin ? (
            <>
              <li>
                <Link to="/userDashboard/lessons">Lessons</Link>
              </li>
              <li>
                <Link to="/userDashboard/tutorial">Tutorial</Link>
              </li>
            </>
          ) : undefined}
          {user?.role == "admin" ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            </>
          ) : undefined}

          {user ? (
            <>
              <li onClick={logOut}>
                <Link>Logout</Link>
              </li>
              <div className="flex items-center gap-2">
                <li>{user?.displayName}</li>
                {user.photoURL ? (
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />
                ) : (
                  <FaUserAlt></FaUserAlt>
                )}
              </div>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
