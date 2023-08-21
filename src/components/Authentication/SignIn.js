import React from 'react';
import GenericForm from '../Forms/GenericForm';
import './SignIn.css'
const SignIn = () => {
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
        <div className="signin-container">
            <GenericForm
                title="SIGN IN"
                fields={fields}
                onSubmit={handleSignIn}
            />
        </div>
    )
};

export default SignIn;
