//Libraries
import { useState, useEffect } from "react";
import { useResize } from "../../hooks/useResize";
//Components
import Table from "./Table/Table";
import List from "./List/List";
import Pagination from "./Pagination/Pagination";

const Movies = ({ searchTerm, filterOption, token }) => {
  const isMobile = useResize();
  const [moviesArray, setMoviesArray] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  //helper functions
  const formatData = (rawMovieArray) => {
    const filteredArray = rawMovieArray.map((movie) => ({
      Title: movie.Title,
      Year: movie.Year,
      imdbID: movie.imdbID,
      Poster: movie.Poster,
      imgURL: `https://img.omdbapi.com/?apikey=${token}&i=${movie.imdbID}`,
      Rating: localStorage.getItem(movie.imdbID) || -1,
    }));
    return filteredArray;
  };
  const filterMovies = (moviesArray) =>
    moviesArray.filter((movie) =>
      movie[filterOption].toLowerCase().includes(searchTerm.toLowerCase())
    );

  //Effects
  useEffect(() => {
    const movie = "Harry Potter";
    const rootUrl = `https://www.omdbapi.com/?type=movie&s=${movie}&apikey=${token}`;

    async function getNumberOfPages() {
      const response = await fetch(rootUrl);
      const data = await response.json();
      setNumberOfPages(Math.floor(data.totalResults / 10) + 1);
    }
    getNumberOfPages();
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
  let moviesUI;
  if (moviesArray) {
    moviesUI = (
      <>
        {isMobile ? (
          <List
            moviesArray={filterMovies(moviesArray)}
            fetchNextPage={fetchNextPage}
          />
        ) : (
          <Table
            moviesArray={filterMovies(moviesArray)}
            fetchNextPage={fetchNextPage}
            showFooter={pageNumber < numberOfPages}
          />
        )}
        <Pagination pageNumber={pageNumber} numberOfPages={numberOfPages} />
      </>
    );
  }
  return moviesUI;
};

export default Movies;
