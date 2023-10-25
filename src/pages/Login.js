import { Link } from 'react-router-dom';
import { ButtonClick } from '../components/ButtonClick';

export function Login() {
    return (
            <div style={{ textAlign: 'center' }}>
            <h1>Login</h1>
            <form style={{ display: 'inline-block', textAlign: 'left' }}>
                <label style={{ display: 'block' }}>
                    Username:*
                    <input type="text" name="username" />
                </label>
                <label style={{ display: 'block' }}>
                    Password:*
                    <input type="password" name="password" />
                </label>
                <button onClick={ButtonClick()}>Submit</button>
                <br></br>
                <Link to="/signup">Don't have an account? Sign Up</Link>
            </form>
        </div>
    );
}