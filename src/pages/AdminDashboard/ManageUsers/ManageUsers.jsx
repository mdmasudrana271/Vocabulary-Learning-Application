import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ConfirmationModal from "../../shared/ConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const ManageUsers = () => {
  const [userData, setUserData] = useState([]);
  const [deleteUser, setDeleteUser] = useState(null);
  // const [buttonStatus, setButtonStatus] = useState(false);

  useEffect(() => {
    fetch(`https://vocabulary-app-server.vercel.app/allUsers`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      });
  }, []);

  const handleMakeAdmin = (user) => {
    fetch(
      `https://vocabulary-app-server.vercel.app/users/makeAdmin/${user._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Promote User To Admin Successfully");
          // setButtonStatus(true);
          window.location.reload();
        }
      });
  };

  const handleDemoteUser = (user) => {
    fetch(
      `https://vocabulary-app-server.vercel.app/users/makeUser/${user._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Demoted Admin To User Successfully");
          // setButtonStatus(true);
          window.location.reload();
        }
      });
  };

  const handleDeleteUser = (user) => {
    fetch(
      `https://vocabulary-app-server.vercel.app/delete-my-users/${user._id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Delete User Successfully");
          window.location.reload();
        }
      });
  };

  const handleCloseModal = () => {
    setDeleteUser(null); // Reset deleteUser state
  };

  return (
    <>
      <Helmet>
        <title>User management</title>
      </Helmet>
      <section>
        <h2 className="text-3xl font-bold">My Users</h2>
        <div className="my-5">
          <div className="overflow-x-auto w-full">
            <div className="overflow-x-auto">
              {userData.length > 0 ? (
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Eamil</th>
                      <th>Promote</th>
                      <th>Demote</th>
                      <th>Delete</th>
                      {/* <th></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {userData?.map((user) => (
                      <tr key={user._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle h-12 w-12">
                                <img
                                  src={user.image}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <button
                            disabled={user.role === "user" ? false : true}
                            onClick={() => handleMakeAdmin(user)}
                            className="btn btn-sm btn-warning"
                          >
                            Promote Admin
                          </button>
                        </td>
                        <td>
                          <button
                            disabled={user.role === "admin" ? false : true}
                            onClick={() => handleDemoteUser(user)}
                            className="btn btn-sm btn-warning"
                          >
                            Demote User
                          </button>
                        </td>
                        <th>
                          <label
                            onClick={() => setDeleteUser(user)}
                            htmlFor="confirmation-modal"
                            className="btn btn-sm btn-warning"
                          >
                            Delete
                          </label>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-error text-xl text-center mt-5">
                  No User found.
                </p>
              )}
            </div>
          </div>

          {deleteUser && (
            <ConfirmationModal
              title={`are you sure you want to delete`}
              message={`if you want to delete ${deleteUser.name}. it can't be undone`}
              closeModal={handleCloseModal}
              successAction={handleDeleteUser}
              modalData={deleteUser}
              successButton="Delete"
            ></ConfirmationModal>
          )}
        </div>
      </section>
    </>
  );
};

ManageUsers.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ManageUsers;
