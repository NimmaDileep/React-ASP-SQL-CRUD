import React, { useState, useEffect } from 'react';
import axios from "axios";
import './ConsultantForm.css';

const ConsultantForm = () => {
    const [consultantNames, setConsultantNames] = useState([]);
    const initialToken = localStorage.getItem('accessToken');
    const [token, setToken] = useState(initialToken);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (token) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const result = await axios.get('https://localhost:44316/api/Employee', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setConsultantNames(result.data.map(item => item.Name));
                } catch (error) {
                    console.error('Error during fetchData:', error);
                }
                setIsLoading(false);
            }
            fetchData();
        }
    }, [token]);
    return (
        <div className="consultant-form-container">
            <h2>New Submission</h2>
            <form>
                <div className="row-container">
                    <div className="input-group">
                        <label htmlFor="name">Name:</label>
                        {isLoading ? (
                            <p>Loading names...</p>
                        ) : (
                            <select id="name" name="name" required>
                                <option value="">Select consultant name</option>
                                {consultantNames.map(name => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="input-group">
                        <label htmlFor="date">Date:</label>
                        <input type="date" id="date" name="date" required />
                    </div>
                </div>

                <div className="row-container">
                    <div className="input-group">
                        <label htmlFor="role">Role:</label>
                        <input type="text" id="role" name="role" placeholder="Enter role" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="client">Client:</label>
                        <input type="text" id="client" name="client" placeholder="Enter client" required />
                    </div>
                </div>

                <div className="row-container">
                    <div className="input-group">
                        <label htmlFor="vendor">Vendor:</label>
                        <input type="text" id="vendor" name="vendor" placeholder="Enter vendor" required />
                    </div>

                    <div className="input-group">
                        <label htmlFor="vendorName">Vendor Name:</label>
                        <input type="text" id="vendorName" name="vendorName" placeholder="Enter vendor name" required />
                    </div>
                </div>

                <div className="input-group full-width">
                    <label htmlFor="status">Status:</label>
                    <select id="status" name="status" required>
                        {/*... options ... */}
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ConsultantForm;
