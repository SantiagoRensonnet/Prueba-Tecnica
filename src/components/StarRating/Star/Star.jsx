import { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

const Star = ({ id, value, handleHovering, setRating }) => {
  const [retrigger, setRetrigger] = useState(true);
  const handleMouseEnter = () => {
    if (retrigger) {
      handleHovering(id, value);
      setRetrigger(false);
    }
  };
  const handleMouseLeave = () => {
    setRetrigger(true);
  };
  const handleMouseClick = () => {
    if (value === "full") {
      setRating(id);
    } else if (value === "empty") {
      setRating(id - 1);
    }
  };

  let starIcon;
  switch (value) {
    case "full":
      starIcon = <AiFillStar size={21} cursor={"pointer"} />;
      break;
    case "empty":
      starIcon = <AiOutlineStar size={21} cursor={"pointer"} />;
      break;
    case "gray":
      starIcon = (
        <AiFillStar size={21} color="hsl(0,0%,87%)" cursor={"pointer"} />
      );
      break;

    default:
      throw new Error("Invalid rating transformation into stars");
      break;
  }
  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleMouseClick}
    >
      {starIcon}
    </span>
  );
};

export default Star;
