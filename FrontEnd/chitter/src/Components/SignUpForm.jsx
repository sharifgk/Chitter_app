import React, { useState } from "react";
import { signup } from "../Utils/api.js";

const SignUpForm = () => {
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
        };

        try {
            const response = await signup(data);
            // Handle successful sign up response
        } catch (error) {
            // Handle error
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while connecting to the server');
            }
        }
    };
   
   return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" name="username" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" className="form-control" id="password" name="password" />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
           </form>
           {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
};

export default SignUpForm;