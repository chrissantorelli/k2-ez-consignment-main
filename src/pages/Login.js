import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/Login.css'; // Make sure to create this CSS file
import { useNavigate } from 'react-router-dom';


export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
      
        try {
          const response = await fetch('https://oh6h5r3we4.execute-api.us-east-1.amazonaws.com/initialStage/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });
      
          const data = await response.json();
    
          // Use the status code from the response
          if (data.statusCode === 200) {
            // Redirect to Dashboard only if status in payload is 200
            navigate('/dashboard', { state: { payload: data } });
          } else {
            // Handle non-200 responses
            setError(data.message || 'Login failed');
          }
        } catch (error) {
          setError('Login failed');
        }
      };
    
      
    
    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                {error && <div className="login-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            className="login-input"
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <Link to="/signup" className="signup-link">Don't have an account? Sign Up</Link>
            </div>
        </div>
    );
}
