import  React, {useState, useEffect, Fragment}  from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";

const CRUD  = () => {
    const [data, setData] = useState([]);

    const [show, setShow] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        axios.get('https://localhost:7261/api/Employee')
            .then((result) => {
                setData(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
        axios.get(`https://localhost:7261/api/Employee/${id}`).then((res) => {
                setEditID(res.data.id)
                setEditName(res.data.name)
                setEditAge(res.data.age)
                setEditCountry(res.data.country)
                setEditPosition(res.data.position)
                setEditWage(res.data.wage)
            }
        )
    }

    const handleSave = () => {
        getData()
        handleClose()
    }
    
    const handleDelete = (id) => {

        if(window.confirm('Are you sure you want to delete')) {
            console.log(id)
            axios.delete(`https://localhost:7261/api/Employee/${id}`)
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
        const url = "https://localhost:7261/api/Employee"
        const data = {
            "name": name,
            "age": age,
            "country": country,
            "position": position,
            "wage": wage
        }

        axios.post(url,data)
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
        console.log("----->", editID)
        const data = {
            "id": editID,
            "name": editName,
            "age": editAge,
            "country": editCountry,
            "position": editPosition,
            "wage": editWage
        }

        axios.put(`https://localhost:7261/api/Employee/${editID}`,data)
            .then((result) => {
                console.log("Updated successfully")
            })
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
                    <button type="submit" className="btn btn-primary" onClick={() => {handleSubmit()}}>Submit</button>
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
                            <button className='btn btn-primary' onClick={() => {handleEdit(item.id)}}>Edit</button> &nbsp;
                            <button className='btn btn-danger' onClick={() => {handleDelete(item.id)}}>Delete</button>
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

                </Col>

            </Modal.Body>
            <Modal.Footer>

                <Button type="submit" className="btn btn-primary" onClick={handleUpdate}>Update</Button>
                <Button variant="primary" className="btn btn-primary" onClick={handleSave}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
        </Fragment>
    )

}

export default CRUD;