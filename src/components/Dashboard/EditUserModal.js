import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditUserModal = ({
                           show,
                           handleClose,
                           editName, setEditName,
                           editAge, setEditAge,
                           editCountry, setEditCountry,
                           editPosition, setEditPosition,
                           editWage, setEditWage,
                           handleUpdate,
                           role
                       }) => {
    return (
        <Modal show={show && (role === 'Admin' || role === 'SuperUser')} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="text" className='form-control mb-3' placeholder="Enter Name" value={editName}
                       onChange={(e) => setEditName(e.target.value)}/>
                <input type="number" className='form-control mb-3' placeholder="Enter Age" value={editAge}
                       onChange={(e) => setEditAge(e.target.value)}/>
                <input type="text" className='form-control mb-3' placeholder="Enter Country" value={editCountry}
                       onChange={(e) => setEditCountry(e.target.value)}/>
                <input type="text" className='form-control mb-3' placeholder="Enter Position" value={editPosition}
                       onChange={(e) => setEditPosition(e.target.value)}/>
                <input type="number" className='form-control mb-3' placeholder="Enter Wage" value={editWage}
                       onChange={(e) => setEditWage(e.target.value)}/>
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <Button variant="secondary" onClick={handleClose} style={{ marginRight: '10px' }}>Close</Button>
                </div>
                {role === 'Admin' || role === 'SuperUser' ? (
                    <div>
                        <Button variant="primary" onClick={() => {handleUpdate()}}>Save Changes</Button>
                    </div>
                ) : null}
            </Modal.Footer>
        </Modal>
    );
}

export default EditUserModal;
