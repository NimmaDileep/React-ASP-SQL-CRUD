import  React, {useState, useEffect, Fragment}  from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const CRUD  = () => {
    const empdata = [
        {
            id: 1,
            name: 'Dileep',
            age: 25,
            country: 'India',
            position: 'Student',
            wage: '7500'
        },
        {
            id: 2,
            name: 'Haritha',
            age: 23,
            country: 'India',
            position: 'SDE',
            wage: '6000'
        }
    ]
    const [data, setData] = useState([]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [country, setCountry] = useState('');
    const [position, setPosition] = useState('');
    const [wage, setWage] = useState('');

    const [editID, setEditID] = useState('');
    const [editName, setEditName] = useState('');
    const [editAge, setEditAge] = useState('');
    const [editCountry, setEditCountry] = useState('');
    const [editPosition, setEditPosition] = useState('');
    const [editWage,setEditWage] = useState('');

    useEffect(() => {
        setData(empdata);
    },[])

    const handleEdit = (id) => {
        handleShow();
    }
    
    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete')) {
        alert(id)
        }
    }

    const handleUpdate = (id) => {

    }
    

    return(
        <Fragment>  
            <Container>
                <Row>
                <Col>
                    <input type="text" className='form-control' placeholder="Enter Name" value={name}
                    onChange={(e) => setName(e.target.value)}/>
                </Col><br/>
                <Col>
                    <input type="number" className='form-control' placeholder="Enter Age" value={age} 
                    onChange={(e) => setAge(e.target.value)}/>
                </Col><br/>
                <Col>
                    <input type="text" className='form-control' placeholder="Enter Country" value={country} 
                    onChange={(e) => setCountry(e.target.value)}/>
                </Col><br/>
                <Col>
                    <input type="text" className='form-control' placeholder="Enter Position" value={position} 
                    onChange={(e) => setPosition(e.target.value)}/>
                </Col><br/>
                <Col>
                    <input type="number" className='form-control' placeholder="Enter Wage" value={wage} 
                    onChange={(e) => setWage(e.target.value)}/>
                </Col><br/>
                <Col>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </Col>
                </Row>
            </Container> <br/> 
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
            <th>Position</th>
            <th>Wage</th>
            <th>Actions</th>
          </tr>
        </thead>
            <tbody>
            { data && data.length ? 
                data.map((item, index) => {
                    return(
                        <tr key = {index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.country}</td>
                        <td>{item.position}</td>
                        <td>{item.wage}</td>
                        <td colSpan={2}>
                            <button className='btn btn-primary' onClick={() => {handleEdit(item.name)}}>Edit</button> &nbsp;
                            <button className='btn btn-danger' onClick={() => {handleDelete(item.name)}}>Delete</button>
                        </td>
                    </tr>
                    )
                }) : 'Loading....'
            }
            </tbody>
         </Table>
            <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Col>
                        <input type="text" className='form-control' placeholder="Enter Name" value={editName}
                        onChange={(e) => setEditName(e.target.value)}/>
                    </Col><br/>
                    <Col>
                        <input type="number" className='form-control' placeholder="Enter Age" value={editAge} 
                        onChange={(e) => setEditAge(e.target.value)}/>
                    </Col><br/>
                    <Col>
                        <input type="text" className='form-control' placeholder="Enter Country" value={editCountry} 
                        onChange={(e) => setEditCountry(e.target.value)}/>
                    </Col><br/>
                    <Col>
                        <input type="text" className='form-control' placeholder="Enter Position" value={editPosition} 
                        onChange={(e) => setEditPosition(e.target.value)}/>
                    </Col><br/>
                    <Col>
                        <input type="number" className='form-control' placeholder="Enter Wage" value={editWage} 
                        onChange={(e) => setEditWage(e.target.value)}/>
                    </Col><br/>
                    <Col>
                        <button type="submit" className="btn btn-primary" onClick={handleEdit}>Update</button>
                    </Col>
                </Col>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleUpdate}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </Fragment>
    )

}

export default CRUD;