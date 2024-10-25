import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {


    return (
        <Row>
            <Col className="mt-5 pt-5 text-center mx-auto">
                <h1>Welcome to Movie world</h1>
                <p>Create, Read, Update and Delete Tasks</p>
                <Link className="btn btn-primary" to={"/movies"}>Check out all the movies</Link>
            </Col>
        </Row>
    )
}