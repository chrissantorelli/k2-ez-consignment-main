import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import '../css/Signup.css';

export function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [role, setRole] = useState('Site Manager');
  const [errorMessages, setErrorMessages] = useState([]);
  const [result, setResult] = useState('');
  const [accountCreated, setAccountCreated] = useState(false); // Track account creation

  const navigate = useNavigate(); // Initialize the navigate function

  function generateUniqueUID() {
    const timestamp = new Date().getTime();
    return parseInt(timestamp, 10);
  }

  function handleClick() {
    const uid = generateUniqueUID();

    if (password !== retypePassword) {
      setErrorMessages(['Passwords do not match.']);
      return;
    }

    setErrorMessages([]);

    const data = {
      uid,
      username,
      password,
      role,
    };

    //console.log(data.uid);

    fetch('https://p1b27ft9l9.execute-api.us-east-1.amazonaws.com/signup-stage/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          // Account created successfully
          setResult(data.body);
          setAccountCreated(true); // Set account creation flag
          setTimeout(() => {
            setAccountCreated(false); // Reset account creation flag after 3 seconds
            setResult('');
            navigate('/login'); // Redirect to the "/login" page
          }, 3000);
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <div className="container">
      <center>
        <h1>Sign Up</h1>
      </center>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="retypePassword">Retype Password:</label>
          <input
            type="password"
            id="retypePassword"
            name="retypePassword"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            required
          />
          <div className="error-message" id="errorMessages">
            {errorMessages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
        </div>
        <input type="hidden" name="uid" id="uid" />
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled>Select Role</option>
            <option value="Site Manager">Site Manager</option>
            <option value="Store Manager">Store Manager</option>
          </select>
        </div>
        <div className="form-group">
          <input type="text" name="result" value={result} readOnly hidden />
        </div>
        <div className="form-group">
          <button type="button" onClick={handleClick}>
            Submit
          </button>
        </div>
      </form>
      {accountCreated && (
        <div className="success-message">
          Your account has been created. Redirecting to login...
        </div>
      )}
    </div>
  );
}

export default Signup;
