import  React, {useState, useEffect, Fragment}  from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";

const CRUD  = (props) => {

    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [token, setToken] = useState(props.token); // fetch token from localStorage
    const role = props.userData && props.userData.Roles

    console.log('Role----->',role)

    const getData = async () => {
        console.log('Calling getData with token:', token);  // NEW
        try {
            const result = await axios.get('https://localhost:44316/api/Employee', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setData(result.data)
        } catch (error) {
            console.error('Error during getData:', error);  // NEW
        }
    }

    useEffect(() => {
        if(token) {
            console.log('Token state updated, calling getData');  // NEW
            getData();
        }
    }, [token]);

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

    const handleEdit = (id) => {
        handleShow();
        axios.get(`https://localhost:44316/api/Employee/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {
                setEditID(res.data.Id)
                setEditName(res.data.Name)
                setEditAge(res.data.Age)
                setEditCountry(res.data.Country)
                setEditPosition(res.data.Position)
                setEditWage(res.data.Wage)
            }
        )
    }

    const handleLogout = () => {
        window.location.href = "http://localhost:3000";
    }

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete')) {
            axios.delete(`https://localhost:44316/api/Employee/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((result) => {
                    alert("Success")
                    getData();
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const handleSubmit = () => {
        const url = "https://localhost:44316/api/Employee"
        const data = {
            "name": name,
            "age": age,
            "country": country,
            "position": position,
            "wage": wage
        }

        axios.post(url,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((result) => {
                getData();
                clear()
            })
    }

    const clear = () => {
        setName('')
        setAge('')
        setPosition('')
        setCountry('')
        setWage('')
        setEditName('')
        setEditAge('')
        setEditPosition('')
        setEditCountry('')
        setEditWage('')
        setEditID('')
    }

    const handleUpdate = () => {
        const data = {
            "id": editID,
            "name": editName,
            "age": editAge,
            "country": editCountry,
            "position": editPosition,
            "wage": editWage
        }

        axios.put(`https://localhost:44316/api/Employee/${editID}`,data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((result) => {
                console.log("Updated successfully")
                getData()
                handleClose()
            })

    }

    return (
        <div>
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            <h1>Employee Data</h1>
                            <button onClick={handleLogout} style={{ position: 'absolute', right: 30, top: 10 }}>Logout</button>
                        </Col>
                    </Row>
                    <Row className="mt-5" style={{paddingLeft: '36px'}}>
                        {role === 'Admin' && (
                            <>
                                <Col>
                                    <input type="text" className='form-control' placeholder="Enter Name" value={name}
                                           onChange={(e) => setName(e.target.value)}/>
                                </Col>
                                <Col>
                                    <input type="number" className='form-control' placeholder="Enter Age" value={age}
                                           onChange={(e) => setAge(e.target.value)}/>
                                </Col>
                                <Col>
                                    <input type="text" className='form-control' placeholder="Enter Country" value={country}
                                           onChange={(e) => setCountry(e.target.value)}/>
                                </Col>
                                <Col>
                                    <input type="text" className='form-control' placeholder="Enter Position" value={position}
                                           onChange={(e) => setPosition(e.target.value)}/>
                                </Col>
                                <Col>
                                    <input type="number" className='form-control' placeholder="Enter Wage" value={wage}
                                           onChange={(e) => setWage(e.target.value)}/>
                                </Col>
                                <Col>
                                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                                </Col>
                            </>
                        )}
                    </Row>
                </Container>
                <br/>
                <div style={{ width: '80%', marginRight: '10%', marginLeft:'10%', paddingTop:'15px'}}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Country</th>
                            <th>Position</th>
                            <th>Wage</th>
                            {(role === 'Admin' || role === 'SuperUser') && <th>Actions</th>}
                        </tr>
                        </thead>
                        <tbody>
                        { data && data.length ?
                            data.map((item, index) => {
                                return(
                                    <tr key = {index}>
                                        <td>{index + 1}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Age}</td>
                                        <td>{item.Country}</td>
                                        <td>{item.Position}</td>
                                        <td>{item.Wage}</td>
                                        {(role === 'Admin' || role === 'SuperUser') && (
                                            <td>
                                                {role === 'Admin' && (
                                                    <Button variant="danger" onClick={() => handleDelete(item.Id)} style={{ marginRight: '10px' }}>Delete</Button>
                                                )}
                                                <Button variant="info" onClick={() => handleEdit(item.Id)}>Edit</Button>
                                            </td>
                                        )}
                                    </tr>
                                )
                            })
                            : null
                        }
                        </tbody>
                    </Table>
                </div>
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
            </Fragment>
        </div>
    )
}

export default CRUD;
