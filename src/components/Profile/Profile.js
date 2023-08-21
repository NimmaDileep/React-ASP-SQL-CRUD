import React from 'react';
import CombinedForm from '../Forms/CombinedForm';

const Profile = () => {
    const fields = [
        { type: 'text', name: 'name', label: 'Name', required: true, placeholder: 'Enter name' },
        {type: 'text', name:'date', label: 'Date', required: false},
        {type: 'text', name:'date', label: 'Date', required: false},
        {type: 'text', name:'date', label: 'Date', required: false},
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return <CombinedForm title="Combined Form" fields={fields} onSubmit={handleSubmit} />;
};

export default Profile;
