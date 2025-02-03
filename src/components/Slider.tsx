/**
 * Importing React and the slider CSS.
 */
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../css/slider.css";

import arrowRight from "../assets/pokedex/pokedexArrowRight.png";
import arrowLeft from "../assets/pokedex/pokedexArrowLeft.png";

/**
 * Props for the Slider component.
 */
interface SliderProps {
  direction: "left" | "right";
}

/**
 * Slider component that displays a left or right arrow to navigate between Dragon Ball Character.
 * Uses the URL parameter to determine the current Dragon Ball Character ID.
 */
const Slider: React.FC<SliderProps> = ({ direction }) => {
  const { dragonballId } = useParams<{ dragonballId: string }>();
  const [newId, setNewId] = React.useState(dragonballId);

  useEffect(() => {
    if (direction === "left") {
      setNewId(`${parseInt(dragonballId || "0") - 1}`);
    } else {
      setNewId(`${parseInt(dragonballId || "0") + 1}`);
    }
  }, [dragonballId]);

  return (
    <div
      style={{ cursor: "pointer" }}
      id="slider"
      className={`slider-${direction}`}
    >
      <Link
        to={`/${newId}`}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={direction === "left" ? arrowLeft : arrowRight}
          alt={`${direction} arrow`}
        />
      </Link>
    </div>
  );
};

export default Slider;
