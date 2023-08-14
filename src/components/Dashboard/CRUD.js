import  React, {useState, useEffect, Fragment}  from 'react';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import './CRUD.css'
import AuthContext from "../AuthContext";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import {FidgetSpinner} from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CRUD  = () => {
    const { authToken, authRole } = React.useContext(AuthContext);
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const initialToken = localStorage.getItem('accessToken');
    const initialRole = localStorage.getItem('userRole');
    const [token, setToken] = useState(initialToken);
    const [role, setRole] = useState(initialRole);
    const [originalData, setOriginalData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log('Role----->',role)

    const getData = async () => {
        setIsLoading(true);
        console.log('Calling getData with token:', token);  // NEW
        try {
            const result = await axios.get('https://localhost:44316/api/Employee', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setOriginalData(result.data);
            setData(result.data);

        } catch (error) {
            console.error('Error during getData:', error);
        }
        await new Promise(r => setTimeout(r, 1000));
        setIsLoading(false);
    }

    useEffect(() => {
        if(token) {
            console.log('Token state updated, calling getData');
            getData();
        }
    }, [token]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete')) {
            axios.delete(`https://localhost:44316/api/Employee/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then((result) => {
                    toast.success('Employee deleted successfully!');
                    getData();
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredData = originalData.filter(item => {  // Here, we are using originalData, not data
            return (
                item.Name.toLowerCase().includes(searchTerm) ||
                item.Age.toString().includes(searchTerm) ||
                item.Country.toLowerCase().includes(searchTerm) ||
                item.Position.toLowerCase().includes(searchTerm) ||
                item.Wage.toString().includes(searchTerm)
            );
        });
        setData(filteredData);
    };


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
                toast.success('Employee updated successfully!');
                getData()
                handleClose()
            })

    }

    return (
        <div className="crudContainer_container">
            <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            {isLoading ? (
                <div className="crudContainer_loader-container">
                    <FidgetSpinner
                        height="100"
                        width="100"
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                    />
                </div>
            ) : (
                <Fragment>
                    <Container>
                        <Row>
                            <Col>
                                <div className="crudContainer_flex">
                                    <div><h1>Consultants Data</h1></div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <br />
                    <div className="crudContainer_search-container">
                        <div className="crudContainer_input-wrapper">
                        <input className="form-control" type="text" placeholder="Search.." onChange={handleSearchChange} />
                    </div>
                </div>

                <div className= "container-fluid">
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
                    {role === 'Admin' && (
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <AddUserModal token={token} afterSubmit={getData} />
                        </div>
                    )}
                </div>
                <EditUserModal
                    show={show}
                    handleClose={handleClose}
                    editName={editName} setEditName={setEditName}
                    editAge={editAge} setEditAge={setEditAge}
                    editCountry={editCountry} setEditCountry={setEditCountry}
                    editPosition={editPosition} setEditPosition={setEditPosition}
                    editWage={editWage} setEditWage={setEditWage}
                    handleUpdate={handleUpdate}
                    role={role}
                />
            </Fragment>
                )}
        </div>
    )
}

export default CRUD;
