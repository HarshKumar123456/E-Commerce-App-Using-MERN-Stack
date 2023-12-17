import React, { useState } from "react";
import Modal from "react-modal"; // Make sure to install react-modal package

const EditCategoryModal = ({ category, onSave, isOpen, onClose }) => {
    const [newName, setNewName] = useState(category.name);

    const handleSave = () => {
        onSave(category._id, newName);
    };

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: "black",
        },
      };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
            <div className="container">
                <h2 className="heading">Edit Category</h2>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="m-2"
                />
                <button className="btn btn-outline-success m-2" onClick={handleSave}>Save</button>
                <button className="btn btn-outline-danger m-2" onClick={onClose}>Close</button>
            </div>
        </Modal>
    );
};

export default EditCategoryModal;
