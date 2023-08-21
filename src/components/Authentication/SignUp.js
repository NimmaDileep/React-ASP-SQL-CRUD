import React from 'react';
import GenericForm from '../Forms/GenericForm';
import './SignUp.css';

const SignUP = () => {
    const fields = [
        {
            type: 'text',
            name: 'username',
            label: 'Username',
            required: true,
            placeholder: 'Enter your username'
        },
        {
            type: 'password',
            name: 'password',
            label: 'Password',
            required: true,
            placeholder: 'Enter your password'
        },
        {
            type: 'password',
            name: 'confirm password',
            label: 'Password',
            required: true,
            placeholder: 'Re-enter your password'
        },
        {
            type: 'email',
            name: 'email',
            label: 'Email',
            required: true,
            placeholder: 'Enter your email'
        }
    ];

    const handleSignIn = (event) => {
        event.preventDefault();

        const { username, password } = event.target.elements;

        // Authenticate the user here
        console.log('Username:', username.value);
        console.log('Password:', password.value);

        // Once authenticated, you can redirect or update the UI accordingly.
    };

    return (
        <div className="signup-container">
            <GenericForm
                title="SIGN UP"
                fields={fields}
                onSubmit={handleSignIn}
            />
        </div>
    );
};

export default SignUP;

