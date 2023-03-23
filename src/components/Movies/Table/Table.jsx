import { FiMoreHorizontal } from "react-icons/fi";
import "./Table.css";
import StarRating from "../../StarRating/StarRating";
import { useState } from "react";

const Table = ({ moviesArray, fetchNextPage, showFooter, updateRatings }) => {
  const [moreIconHover, setMoreIconHover] = useState(false);
  return (
    moviesArray && (
      <section className="movie-table--section">
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
              {moviesArray.map((movie) => (
                <tr key={movie.imdbID}>
                  <td>{movie.imdbID}</td>
                  <td>{movie.Title}</td>
                  <td>{movie.Year}</td>
                  <td>
                    <img
                      src={movie.imgURL}
                      alt="movie-poster"
                      className="movie-table--image"
                    />
                  </td>
                  <td>
                    <StarRating
                      key={movie.imdbID}
                      id={movie.imdbID}
                      rating={movie.Rating}
                      updateRatings={updateRatings}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            {showFooter && (
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
                      className="table-footer--icon"
                    />
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </article>
      </section>
    )
  );
};

export default Table;
