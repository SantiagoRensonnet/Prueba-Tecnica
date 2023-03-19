import { useState, useEffect } from "react";
//Components
import Star from "../Star/Star";
//Styles
import "./StarRating.css";

const StarRating = ({ id, rating }) => {
  const [starArray, setStarAray] = useState([]);
  const [starArrayBeforeHover, setStarArrayBeforeHover] = useState([]);
  const [hovering, setHovering] = useState(false);

  const mapRatingToStars = (rating) => {
    const ratingMap = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= 1 && i / rating <= 1) {
        ratingMap.push({
          id: i,
          value: "full",
        });
      } else if (rating >= 0) {
        ratingMap.push({
          id: i,
          value: "empty",
        });
      } else {
        ratingMap.push({
          id: i,
          value: "gray",
        });
      }
    }
    return ratingMap;
  };
  useEffect(() => {
    const newStarArray = mapRatingToStars(rating);
    setStarAray(newStarArray);
    setStarArrayBeforeHover(newStarArray);
  }, []);
  const handleHovering = (id, value) => {
    if (!hovering) {
      setStarArrayBeforeHover(starArray);
      setHovering(true);
    }
    const hoveringArray = [...starArray];
    if (value === "full") {
      //removing starts
      for (let i = 1; i <= 5; i++) {
        hoveringArray[i - 1] = {
          id: i,
          value: i < Number(id) ? "full" : "empty",
        };
      }
    } else {
      //filling starts
      for (let i = 1; i <= 5; i++) {
        hoveringArray[i - 1] = {
          id: i,
          value: i <= Number(id) ? "full" : "empty",
        };
      }
    }
    setStarAray(hoveringArray);
  };

  const resetStarArray = () => {
    setStarAray(starArrayBeforeHover);
    setHovering(false);
  };
  const setRating = (starId) => {
    const newStarArray = mapRatingToStars(starId);
    setStarAray(newStarArray);
    setStarArrayBeforeHover(newStarArray);
    setHovering(false);
    //the next step is to save it to local storage
    localStorage.setItem(id, starId);
  };
  return (
    <div className="stars-container" onMouseLeave={resetStarArray}>
      {starArray.map((star) => (
        <Star
          key={star.id}
          id={star.id}
          value={star.value}
          handleHovering={handleHovering}
          setRating={setRating}
        />
      ))}
    </div>
  );
};

export default StarRating;
