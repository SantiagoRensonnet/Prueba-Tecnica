import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
//Components
import StarRating from "../../StarRating/StarRating";
//Styles
import "./List.css";

const List = ({ moviesArray, fetchNextPage, showFooter, updateRatings }) => {
  const [moreIconHover, setMoreIconHover] = useState(false);
  return (
    <section className="list-section">
      <ul>
        {moviesArray.map((movie) => (
          <li key={movie.imdbID} className="movie-list--card">
            <figure className="movie-list--figure">
              <img
                src={movie.imgURL}
                alt="movie-poster"
                className="movie-list--image"
              />
            </figure>

            <div className="movie-card--description">
              <div className="movie-card--additional-info">
                <span>{movie.imdbID}</span>
                <span>{movie.Year}</span>
              </div>
              <h1>{movie.Title}</h1>
              <div className="movie-card--star-rating-container">
                <StarRating
                  key={movie.imdbID}
                  id={movie.imdbID}
                  rating={movie.Rating}
                  updateRatings={updateRatings}
                />
              </div>
            </div>
          </li>
        ))}
        {showFooter && (
          <li className="movie-list--button-container">
            <button
              className="movie-list--more-button"
              onClick={fetchNextPage}
              onMouseEnter={() => setMoreIconHover(true)}
              onMouseLeave={() => setMoreIconHover(false)}
            >
              <AiOutlinePlus
                size={18}
                color={moreIconHover ? "#646cff" : "black"}
                className="movie-list--button-icon"
              />
            </button>
          </li>
        )}
      </ul>
    </section>
  );
};

export default List;
