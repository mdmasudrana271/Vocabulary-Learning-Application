import PropTypes from "prop-types";

const ConfirmationModal = ({
  title,
  message,
  closeModal,
  successAction,
  modalData,
  successButton,
}) => {
  ConfirmationModal.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    successAction: PropTypes.func.isRequired,
    modalData: PropTypes.object, // Adjust the type as needed
    successButton: PropTypes.string.isRequired,
  };
  return (
    <div>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label
              onClick={() => successAction(modalData)}
              htmlFor="confirmation-modal"
              className="btn"
            >
              {successButton}
            </label>
            <button onClick={closeModal} className="btn btn-outline">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
