import "./Table.css";
import { useState, useEffect } from "react";

const Table = ({ searchTerm, filterOption, token }) => {
  const [moviesArray, setMoviesArray] = useState([]);

  useEffect(() => {
    const movie = "Harry Potter";
    const rootUrl = `http://www.omdbapi.com/?type=movie&s=${movie}&apikey=${token}`;

    async function getData() {
      const response = await fetch(rootUrl);
      const data = await response.json();
      const numberOfPages = Math.floor(data.totalResults / 10) + 1;

      for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
        const response = await fetch(`${rootUrl}&page=${pageNumber}`);
        const data = await response.json();
        setMoviesArray((prevState) => {
          return [...prevState, ...data.Search];
        });
      }
    }
    getData();
  }, []);

  return moviesArray ? (
    <section className="movie-table--outer-container">
      <article className="movie-table--inner-container">
        <table className="movie-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Titulo</th>
              <th>Año</th>
              <th>Poster</th>
              <th>Valoración Personal</th>
            </tr>
          </thead>
          <tbody>
            {moviesArray
              .filter((movie) =>
                movie[filterOption]
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((movie) => (
                <tr key={movie.imdbID}>
                  <td>{movie.imdbID}</td>
                  <td>{movie.Title}</td>
                  <td>{movie.Year}</td>
                  <td>
                    <img
                      src={`http://img.omdbapi.com/?apikey=${token}&i=${movie.imdbID}`}
                      alt="movie-poster"
                      className="movie-image"
                    />
                  </td>
                  <td>{Math.floor(Math.random() * 5 + 1)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </article>
    </section>
  ) : (
    <h2>Loading..</h2>
  );
};

export default Table;
