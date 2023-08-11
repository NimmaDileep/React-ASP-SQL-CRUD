import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState('123-456-7890');

    const handleSubmit = () => {
        // Logic to update the user details
    };

    return (
        <div className="profile-container">
            <h2>Edit Profile</h2>
            <div className="profile-form">
                <div className="input-group">
                    <label>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                {/*<div className="input-group">*/}
                {/*    <label>Phone</label>*/}
                {/*    <input*/}
                {/*        type="tel"*/}
                {/*        value={phone}*/}
                {/*        onChange={e => setPhone(e.target.value)}*/}
                {/*    />*/}
                {/*</div>*/}
                <button onClick={handleSubmit} className="submit-button">Update Profile</button>
            </div>
        </div>
    );
}

export default Profile;
