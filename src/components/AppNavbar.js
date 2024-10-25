import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {
    const { user } = useContext(UserContext);

    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container fluid>
                {/* Left side Logo */}
                <Navbar.Brand as={Link} to="/">Movie</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* Admin Links */}
                        {user?.isAdmin ? (
                            <>
                                <Nav.Link as={NavLink} to="/movies" exact="true">
                                    Movies
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/AddMovie" exact="true">
                                    Add Movie
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/admin" exact="true">
                                    Admin Dashboard
                                </Nav.Link>
                                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            </>
                        ) : user?.id ? (
                            // Logged-in User Links
                            <>
                                <Nav.Link as={NavLink} to="/movies" exact="true">
                                    Movies
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/profile" exact="true">
                                    Profile
                                </Nav.Link>
                                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                            </>
                        ) : (
                            // Guest Links (not logged in)
                            <>
                                <Nav.Link as={NavLink} to="/movies" exact="true">
                                    Movies
                                </Nav.Link>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
