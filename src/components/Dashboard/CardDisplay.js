import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from "axios";
import AuthContext from "../AuthContext";
import {FidgetSpinner} from 'react-loader-spinner';
import "./CardDisplay.css";

const CardDisplay = () => {
    const { authToken } = React.useContext(AuthContext);
    const [data, setData] = useState([]);
    const initialToken = localStorage.getItem('accessToken');
    const [token, setToken] = useState(initialToken);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(token) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const result = await axios.get('https://localhost:44316/api/Employee', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setData(result.data);
                } catch (error) {
                    console.error('Error during fetchData:', error);
                }
                setIsLoading(false);
            }
            fetchData();
        }
    }, [token]);

    return (
        <div className="card-container">
            <Container>
                <Row>
                    {isLoading ? (
                        <div className="loader-container">
                            <FidgetSpinner height="100" width="100" color="#4fa94d" />
                        </div>
                    ) : (
                        data.map((item, index) => (
                            <Col key={index} md={4}>
                                <Card className="mb-4">
                                    <Card.Img variant="top" src="URL_TO_RANDOM_IMAGE" />
                                    <Card.Body>
                                        <Card.Title>{item.Name}</Card.Title>
                                        <Card.Text>Age: {item.Age}</Card.Text>
                                        <Card.Text>Country: {item.Country}</Card.Text>
                                        <Card.Text>Position: {item.Position}</Card.Text>
                                        <Card.Text>Wage: {item.Wage}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </div>
    )
}

export default CardDisplay;
