import { Modal } from "antd";
import { useState } from "react";


type InputModalProps = {
    modalOpen: boolean;
    closeModal: () => void;
    onSuccess: () => void;
}

const InputModal = ({modalOpen, closeModal, onSuccess}: InputModalProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        onSuccess();
        setTimeout(() => {
          closeModal();
          setConfirmLoading(false);
        }, 2000);
      };
    

    return (
        <Modal
            title="Title"
            open={modalOpen}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={closeModal}
        >
            <p>Tes</p>
        </Modal>
    )
}

export default InputModal;