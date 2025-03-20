import React, { useState } from "react";
import styles from "./TestNotifModal.module.css";

const TestNotifModal: React.FC = () => {
    const [showModal, setShowModal] = useState(() => {
        return localStorage.getItem("showTestNotifModal") !== "false";
    });

    const handleModalClose = () => {
        setShowModal(false);
        localStorage.setItem("showTestNotifModal", "false");
    };

    if (!showModal) return null;

    return (
        <div className={styles.contextAlert}>
            <p>Hi there!</p>
            <p>
                This is a lightweight demo version of a proof-of-concept MVP project developed for Tech Returns (completed 02/25).  
                While this version showcases core functionality—retrieving events and posting events (available when signed in as a moderator)—it does not include all the features of a full production-ready application.
            </p>

            <button onClick={handleModalClose} className={styles.btn}>Okay</button>
        </div>
    );
};

export default TestNotifModal;
