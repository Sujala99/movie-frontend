// import { useState, useEffect, useContext } from 'react';
// import { Row, Col } from 'react-bootstrap';
// import MovieCard from '../components/MovieCard';
// import UserContext from '../UserContext';

// export default function Movies() {
//   const { user } = useContext(UserContext);
//   const [movies, setMovies] = useState([]); // Initialize as an empty array

//   useEffect(() => {
//     fetch('http://localhost:4000/movies/getallmovies')
//       .then((res) => res.json())
//       .then((data) => {
//         // Check if the response contains movies
//         setMovies(data.movies || []);
//       })
//       .catch((err) => {
//         console.error('Error fetching movies:', err);
//         setMovies([]); // Fallback to empty array on error
//       });
//   }, []);

//   return (
//     <div>
//       <h1 className="my-5 text-center">Movie List</h1>
//       <Row>
//         {movies.length > 0 ? (
//           movies.map((movie) => (
//             <Col key={movie._id} md={4}>
//               <MovieCard movie={movie} />
//             </Col>
//           ))
//         ) : (
//           <p className="text-center">No movies available.</p>
//         )}
//       </Row>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieCard from '../components/MovieCard';

export default function Movies() {
  const [movies, setMovies] = useState([]); // Initialize as an empty array

  useEffect(() => {
    fetch('http://localhost:4000/movies/getallmovies')
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.movies || []);
      })
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setMovies([]); // Fallback to empty array on error
      });
  }, []);

  // Function to remove a deleted movie from the state
  const removeMovieFromState = (id) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== id));
  };

  // Function to update a movie in the state after an edit
  const updateMovieInState = (updatedMovie) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie._id === updatedMovie._id ? updatedMovie : movie
      )
    );
  };

  return (
    <div>
      <h1 className="my-5 text-center">Movie List</h1>
      <Row>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Col key={movie._id} md={4}>
              <MovieCard
                movie={movie}
                removeMovieFromState={removeMovieFromState}
                updateMovieInState={updateMovieInState}
              />
            </Col>
          ))
        ) : (
          <p className="text-center">No movies available.</p>
        )}
      </Row>
    </div>
  );
}
