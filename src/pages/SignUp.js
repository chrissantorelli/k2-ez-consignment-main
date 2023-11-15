import React, { useState } from 'react';

export function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [role, setRole] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [result, setResult] = useState('');

  function generateUniqueUID() {
    const timestamp = new Date().getTime();
    return parseInt(timestamp, 10); // Convert timestamp to an integer
  }

  function handleClick() {
    const uid = generateUniqueUID();
    const data = {
      uid,
      username,
      password,
      role,
    };

    console.log(data)

    if (password !== retypePassword) {
      setErrorMessages(['Passwords do not match.']);
      return;
    }

    setErrorMessages([]);

    fetch('https://p1b27ft9l9.execute-api.us-east-1.amazonaws.com/signup-stage/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          alert('Unable to process request');
        } else {
          alert('Not DONE');
        }
      })
      .then((data) => {
        setResult(data.body);
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
    </div>
  );
}
