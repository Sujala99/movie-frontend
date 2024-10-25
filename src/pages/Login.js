import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    const authenticate = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(res => {
            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error("Invalid login credentials. Please check your email and password.");
                }
                throw new Error(`Server error: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            if (data.access) {
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                }).then(() => {
                    navigate('/movies');
                });
            } else {
                Swal.fire({
                    title: "Authentication failed",
                    icon: "error",
                    text: "Check your login details and try again."
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: error.message,
            });
        });

        setEmail('');
        setPassword('');
    };

    const retrieveUserDetails = (token) => {
        fetch('http://localhost:4000/users/details', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Failed to retrieve user details: ${res.statusText}`);
            }
            return res.json();
        })
        .then(data => {
            setUser({
                id: data.user?._id,
                isAdmin: data.user?.isAdmin || false,
                email: data.user?.email
            });
        })
        .catch(error => {
            console.error('Error retrieving user details:', error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: "Unable to retrieve user details.",
            });
        });
    };

    useEffect(() => {
        setIsActive(email !== '' && password !== '');
    }, [email, password]);

    return (
        user?.id ? (
            <Navigate to="/movies" replace /> // Redirect if user is logged in
        ) : (
            <Form onSubmit={authenticate}>
                <h1 className="my-5 text-center">Login</h1>
                <Form.Group controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                {isActive ? 
                    <Button variant="primary" type="submit">
                        Submit
                    </Button> 
                    : 
                    <Button variant="danger" type="submit" disabled>
                        Submit
                    </Button>
                }
            </Form>
        )
    );
}
