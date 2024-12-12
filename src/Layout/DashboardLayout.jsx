import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import useAdmin from "../Hooks/useAdmin";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";
import { Toaster } from "react-hot-toast";
// import Navbar from "../pages/shared/Navbar";

const DashBoardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  return (
    <div className="">
      <div className="flex align-middle justify-items-center md:block z-40">
        <Navbar></Navbar>
        <label
          htmlFor="my-drawer-2"
          tabIndex={0}
          role="button"
          className="btn btn-ghost lg:hidden "
        >
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
        </label>
      </div>
      <div className="drawer lg:drawer-open z-0">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side ">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <>
              {isAdmin && (
                <>
                  <li>
                    <Link to="/adminDashboard/addlessons">Add Lesson</Link>
                  </li>
                  <li>
                    <Link to="/adminDashboard/addvucabulary">
                      Add Vocabulary
                    </Link>
                  </li>
                  <li>
                    <Link to="/adminDashboard/lessonsmanagement">
                      Manage Lessons
                    </Link>
                  </li>
                  <li>
                    <Link to="/adminDashboard/manageusers">Manage Users</Link>
                  </li>
                  <li>
                    <Link to="/adminDashboard/vocabularymangement">
                      Manage Vocabulary
                    </Link>
                  </li>
                </>
              )}
            </>
          </ul>
        </div>
      </div>
      <Footer></Footer>
      <Toaster />
    </div>
  );
};

export default DashBoardLayout;
