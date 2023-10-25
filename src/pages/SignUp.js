import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export function SignUp() {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRetypePasswordChange = (event) => {
        setRetypePassword(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!fullName || !username || !password || !retypePassword || !role) {
            setErrorMessage("All fields are required.");
        } else if (password !== retypePassword) {
            setErrorMessage("Passwords do not match. Please re-enter your password.");
        } else {
            setErrorMessage(""); 
            let fullName = document.getElementById("name").value;
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            let role = document.getElementById("role").value;
            console.log(fullName, username, password, role);
            alert("Form submitted successfully!");
        }
    };
    

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Sign Up</h1>
            <form style={{ display: 'inline-block', textAlign: 'left' }} onSubmit={handleSubmit}>
                <label style={{ display: 'block' }}>
                    Full Name:*
                    <input type="text" name="name" id="name" onChange={handleFullNameChange} />
                </label>
                <label style={{ display: 'block' }}>
                    Username:*
                    <input type="text" name="username" id="username" onChange={handleUsernameChange} />
                </label>
                <label style={{ display: 'block' }}>
                    Password:*
                    <input type="password" name="password" id="password" onChange={handlePasswordChange} />
                </label>
                <label style={{ display: 'block' }}>
                    Re-type Password:*
                    <input type="password" name="retypePassword" id="retypePassword" onChange={handleRetypePasswordChange} />
                </label>
                <label style={{ display: 'block' }}>
                    Role:*
                    <select name="role" id="role" onChange={handleRoleChange}>
                        <option value="">Select a role</option>
                        <option value="Site Manager">Site Manager</option>
                        <option value="Store Manager">Store Manager</option>
                    </select>
                </label>
                <div style={{ color: 'red' }}>{errorMessage}</div>
                <button type="submit">Submit</button>
                <br></br>
                <Link to="/login">Already have an account? Login</Link>
            </form>
        </div>
    );
}
