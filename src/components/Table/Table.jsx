import { useState, useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import "./Table.css";

import StarRating from "../StarRating/StarRating";

const Table = ({ searchTerm, filterOption, token }) => {
  const [moviesArray, setMoviesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numberOfPages, setNumberOfPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const [moreIconHover, setMoreIconHover] = useState(false);

  const formatData = (rawMovieArray) => {
    const filteredArray = rawMovieArray.map((movie) => ({
      Title: movie.Title,
      Year: movie.Year,
      imdbID: movie.imdbID,
      Poster: movie.Poster,
      Rating: localStorage.getItem(movie.imdbID) || -1,
    }));
    return filteredArray;
  };

  useEffect(() => {
    const movie = "Harry Potter";
    const rootUrl = `https://www.omdbapi.com/?type=movie&s=${movie}&apikey=${token}`;

    async function getNumberOfPages() {
      const response = await fetch(rootUrl);
      const data = await response.json();
      setNumberOfPages(Math.floor(data.totalResults / 10) + 1);
    }
    getNumberOfPages();
    setIsLoading(false);
  }, []);

  useEffect(() => {
    async function getData() {
      const movie = "Harry Potter";
      const rootUrl = `https://www.omdbapi.com/?type=movie&s=${movie}&apikey=${token}`;
      const response = await fetch(`${rootUrl}&page=${pageNumber}`);
      const data = await response.json();
      const filteredData = formatData(data.Search);
      setMoviesArray((prevState) => {
        return [...prevState, ...filteredData];
      });
    }
    getData();
  }, [pageNumber]);

  //Event Handlers
  const fetchNextPage = () => {
    setPageNumber((prevState) => Math.min(prevState + 1, numberOfPages));
  };
  return !isLoading && moviesArray ? (
    <>
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
                        src={`https://img.omdbapi.com/?apikey=${token}&i=${movie.imdbID}`}
                        alt="movie-poster"
                        className="movie-image"
                      />
                    </td>
                    <td>
                      <StarRating
                        key={movie.imdbID}
                        id={movie.imdbID}
                        rating={movie.Rating}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
            {pageNumber < numberOfPages && (
              <tfoot
                onMouseEnter={() => setMoreIconHover(true)}
                onMouseLeave={() => setMoreIconHover(false)}
                onClick={fetchNextPage}
                className="table-footer"
              >
                <tr>
                  <td colSpan={5} className="table-footer--content">
                    <FiMoreHorizontal
                      size={24}
                      color={moreIconHover ? "#646cff" : "black"}
                    />
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </article>
      </section>
      {pageNumber < numberOfPages && (
        <section className="pages-left-section">
          <p>{numberOfPages - pageNumber} pages left</p>
        </section>
      )}
    </>
  ) : (
    <h2>Loading..</h2>
  );
};

export default Table;
