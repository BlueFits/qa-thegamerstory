import { Modal } from "@material-ui/core";

const ModalComp = ({ open, onClose, children, black }) => {

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={{ width: 500, height: 450, left: "50%", top: "30%", transform: "translate(-50%, -30%)" }} className={`${black ? "bg-black" : "bg-white"} absolute flex flex-col justify-center items-center`}>{children}</div>
        </Modal>
    );
};

export default ModalComp;