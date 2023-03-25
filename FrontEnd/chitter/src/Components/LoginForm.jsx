import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Utils/api.js";

const LoginForm = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
       
        const data = {
            email: event.target.email.value,
            password: event.target.password.value,
        }
       
        try {
            // Handle successful login and store token
            const response = await login(data);
            localStorage.setItem("token", response.token);
            setError('');
            onLogin();
            navigate('/');
        } catch (error) {
            setError('Invalid email or password')
        }
    };
    
    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(event)=> setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(event)=> setPassword(event.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;