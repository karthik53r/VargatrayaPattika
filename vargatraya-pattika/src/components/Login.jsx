import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if username and password match the predefined values
        if (username === import.meta.env.VITE_APP_UserName && password === import.meta.env.VITE_APP_Password) {
            // Navigate to '/home' if the credentials are correct
            navigate('/home');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className='bg-white rounded-md p-12 max-w-md mx-auto'>
            <h2 className="text-2xl font-semibold mb-8 text-center">Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <div className="flex justify-center mt-8">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
