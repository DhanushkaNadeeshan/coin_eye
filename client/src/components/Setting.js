import { useState } from 'react';
import Main from "./Main"
import Modal from "../theme/Modal";
import Button from "../theme/Button";

export default function Setting() {

    const [statusModal, setStatusModal] = useState(false);

    const closeModal = () => {
        setStatusModal(false)
    }
    const openModal = () => {
        setStatusModal(true);
    }

    return (
        <Main name="Setting">
            <Button onClick={openModal}>
                Open Modal
            </Button>

         
            <Modal
                title="Add a new card"
                action={statusModal}
                closeHandle={closeModal}
            >

            </Modal>
        </Main>
    )
}