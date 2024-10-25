import { Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import UserContext from '../UserContext';

export default function MovieCard({ movie, removeMovieFromState, updateMovieInState }) {
  const { _id, title, description, director, genre } = movie;
  const { user } = useContext(UserContext);

  // Update movie function (requires admin privileges)
  function updateMovie(id) {
    // Show Swal prompt for movie update
    Swal.fire({
      title: 'Update Movie',
      html:
        `<input id="title" class="swal2-input" placeholder="Title" value="${title}">` +
        `<input id="description" class="swal2-input" placeholder="Description" value="${description}">` +
        `<input id="genre" class="swal2-input" placeholder="Genre" value="${genre}">` +
        `<input id="director" class="swal2-input" placeholder="director" value="${director}">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: () => {
        const updatedTitle = document.getElementById('title').value;
        const updatedDescription = document.getElementById('description').value;
        const updatedGenre = document.getElementById('genre').value;
        const updatedDirector = document.getElementById('director').value;
        return {
          title: updatedTitle,
          description: updatedDescription,
          genre: updatedGenre,
          status: updatedDirector,
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedMovie = result.value;

        // Send update request to the server
        fetch(`http://localhost:4000/movies/${id}`, {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedMovie)
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              Swal.fire({
                icon: 'error',
                title: 'Unsuccessful Movie Update',
                text: data.message,
              });
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Movie Updated',
              });
              // Update the movie in the state of the parent component
              updateMovieInState(data.movie);
            }
          });
      }
    });
  }

  // Delete movie function (requires admin privileges)
  function deleteMovie(id) {
    fetch(`http://localhost:4000/movies/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          Swal.fire({
            icon: 'error',
            title: 'Unsuccessful Movie Deletion',
            text: data.message,
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Movie Deleted',
          });
          // Remove the movie from the state in the parent component
          removeMovieFromState(id);
        }
      });
  }

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Genre:</Card.Subtitle>
        <Card.Text>{genre}</Card.Text>
        <Card.Subtitle>Director:</Card.Subtitle>
        <Card.Text>{director}</Card.Text>
      </Card.Body>
      {user.isAdmin && (
        <Card.Footer className="d-flex justify-content-around">
          <button className="btn btn-primary btn-sm" onClick={() => updateMovie(_id)}>Update</button>
          <button className="btn btn-danger btn-sm" onClick={() => deleteMovie(_id)}>Delete</button>
        </Card.Footer>
      )}
    </Card>
  );
}
