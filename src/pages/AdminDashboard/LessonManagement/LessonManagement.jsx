import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../shared/ConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const LessonManagement = () => {
  const [lessons, setLessons] = useState([]);
  const [deleteLesson, setDeleteLesson] = useState(null);

  useEffect(() => {
    fetch(`https://vocabulary-app-server.vercel.app/allLessons`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLessons(data);
      });
  }, []);

  const handleDeleteLesson = (vocab) => {
    fetch(
      `https://vocabulary-app-server.vercel.app/delete-lesson/${vocab._id}`,
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
    setDeleteLesson(null); // Reset deleteUser state
  };

  return (
    <>
      <Helmet>
        <title>Lessons management</title>
      </Helmet>
      <section>
        <h2 className="text-3xl font-bold">Lessons Management</h2>
        <div className="my-5">
          <div className="overflow-x-auto w-full">
            <div className="overflow-x-auto">
              {lessons.length > 0 ? (
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Lesson Name</th>
                      <th>Lesson Number</th>
                      <th>Vocabulary Count</th>
                      <th>Update</th>
                      <th>Delete</th>
                      {/* <th></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {lessons?.map((lesson) => (
                      <tr key={lesson._id}>
                        <td>{lesson.lessonName}</td>
                        <td>{lesson.lessonNumber}</td>
                        <td>{lesson.wordCount}</td>
                        <td>
                          <button className="btn btn-sm btn-warning">
                            <Link
                              to={`/adminDashboard/lessonsmangement/update/${lesson._id}`}
                            >
                              update
                            </Link>
                          </button>
                        </td>
                        <th>
                          <label
                            onClick={() => setDeleteLesson(lesson)}
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
                  No Lessons found.
                </p>
              )}
            </div>
          </div>

          {deleteLesson && (
            <ConfirmationModal
              title={`are you sure you want to delete`}
              message={`if you want to delete ${deleteLesson.word}. it can't be undone`}
              closeModal={handleCloseModal}
              successAction={handleDeleteLesson}
              modalData={deleteLesson}
              successButton="Delete"
            ></ConfirmationModal>
          )}
        </div>
      </section>
    </>
  );
};

export default LessonManagement;
