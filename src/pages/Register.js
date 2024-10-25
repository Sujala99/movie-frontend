import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom'; // Import useNavigate
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(
      email !== '' &&
      password !== '' &&
      confirmPassword !== '' &&
      password === confirmPassword
    );
  }, [email, password, confirmPassword]);

  const registerUser = (e) => {
  e.preventDefault();

  fetch('http://localhost:4000/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.message === 'Registered Successfully') {
        setUser({ id: data.userId, isAdmin: false });
        Swal.fire({
          title: 'Registration Successful',
          icon: 'success',
          text: 'Thank you for registering!',
        }).then(() => {
          navigate('/login');
        });
      } else {
        Swal.fire({
          title: 'Registration Failed',
          icon: 'error',
          text: data.message || 'Please try again later.',
        });
      }
    })
    .catch((err) => {
      console.error('Error:', err); // Log specific error message
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Failed to connect to the server. Please check the server status.',
      });
    });
};

  return user?.id ? (
    <Navigate to="/" />
  ) : (
    <Form onSubmit={registerUser}>
      <h1 className="my-5 text-center">Register</h1>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      {isActive ? (
        <Button variant="primary" type="submit">
          Submit
        </Button>
      ) : (
        <Button variant="primary" disabled>
          Submit
        </Button>
      )}
    </Form>
  );
}
