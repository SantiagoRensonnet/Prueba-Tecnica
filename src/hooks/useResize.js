import { useEffect, useState } from "react";

export const useResize = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 829);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 829);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      //remove listener when calling component unmounts
      window.removeEventListener("resize", handleResize);
    };
  });
  return isMobile;
};
