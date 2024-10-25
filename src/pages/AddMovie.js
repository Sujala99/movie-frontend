import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function AddMovie() {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    // Define state variables for form inputs
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [director, setDirector] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");

    // Function to handle form submission
    function createTask(e) {
        e.preventDefault();

        const token = localStorage.getItem('token');

        fetch('http://localhost:4000/movies/add', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: name,
                description: description,
                director: director,
                genre: genre,
                year: parseInt(year, 10)  // Ensure year is a number
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Failed to save the movie.");
            }
            return res.json();
        })
        .then(data => {
            if (data.error) {
                Swal.fire({
                    icon: "error",
                    title: "Unsuccessful Movie Creation",
                    text: data.message
                });
            } else {
                Swal.fire({
                    icon: "success",
                    title: "Movie Added Successfully"
                });
                navigate("/movies");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message
            });
        });

        // Reset form fields
        setName("");
        setDescription("");
        setDirector("");
        setGenre("");
        setYear("");
    }

    return (
        user.id ? (
            <>
                <h1 className="my-5 text-center">Add Movie</h1>
                <Form onSubmit={createTask}>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Description"
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Director:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Director"
                            required
                            value={director}
                            onChange={e => setDirector(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Genre:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Genre"
                            required
                            value={genre}
                            onChange={e => setGenre(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Year:</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter Year"
                            required
                            value={year}
                            onChange={e => setYear(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="my-5">Submit</Button>
                </Form>
            </>
        ) : (
            <Navigate to="/movies" />
        )
    );
}
