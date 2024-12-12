import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ConfirmationModal from "../../shared/ConfirmationModal/ConfirmationModal";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const VocabularyManagement = () => {
  const [vocabulary, setVocabulary] = useState([]);
  const [deleteVocab, setDeleteVocab] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/allVocabulary`, {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVocabulary(data);
      });
  }, []);

  const handleDeleteVocab = (vocab) => {
    fetch(`http://localhost:5000/delete-vocabulary/${vocab._id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Delete User Successfully");
          window.location.reload();
        }
      });
  };

  const handleCloseModal = () => {
    setDeleteVocab(null); // Reset deleteUser state
  };

  return (
    <>
      <Helmet>
        <title>Vocabulary management</title>
      </Helmet>
      <section>
        <h2 className="text-3xl font-bold">Vocabulary Management</h2>
        <div className="my-5">
          <div className="overflow-x-auto w-full">
            <div className="overflow-x-auto">
              {vocabulary.length > 0 ? (
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Word</th>
                      <th>Pronunciation</th>
                      <th>When To Say</th>
                      <th>Meaning</th>
                      <th>Lesson Number</th>
                      <th>Update</th>
                      <th>Delete</th>
                      {/* <th></th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {vocabulary?.map((vocab) => (
                      <tr key={vocab._id}>
                        <td>{vocab.word}</td>
                        <td>{vocab.pronunciation}</td>
                        <td>{vocab.whenToSay}</td>
                        <td>{vocab.meaning}</td>
                        <td>{vocab.lessonNumber}</td>
                        <td>
                          <button className="btn btn-sm btn-warning">
                            <Link
                              to={`/adminDashboard/vocabularymangement/update/${vocab._id}`}
                            >
                              update
                            </Link>
                          </button>
                        </td>
                        <th>
                          <label
                            onClick={() => setDeleteVocab(vocab)}
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
                  No vocabulary found.
                </p>
              )}
            </div>
          </div>

          {deleteVocab && (
            <ConfirmationModal
              title={`are you sure you want to delete`}
              message={`if you want to delete ${deleteVocab.word}. it can't be undone`}
              closeModal={handleCloseModal}
              successAction={handleDeleteVocab}
              modalData={deleteVocab}
              successButton="Delete"
            ></ConfirmationModal>
          )}
        </div>
      </section>
    </>
  );
};

export default VocabularyManagement;
