/**
 * Importing React and the DragonBallType CSS.
 */
import React from "react";
import "../css/dragonballtype.css";

/**
 * Interface for the DragonBallTypeProps type, which includes the Dragon Ball Character type.
 */
interface DragonBallTypeProps {
  type: string;
}

/**
 * A React functional component that displays a Dragon Ball Character type icon and its name.
 *
 * @component
 * @param {DragonBallTypeProps} props - The properties object.
 * @param {string} props.type - The type of the Dragon Ball Character.
 * @returns {JSX.Element} A div containing an image of the Dragon Ball Character type and its name.
 */
const DragonBallType: React.FC<DragonBallTypeProps> = ({ type }) => {
  return (
    <div className={`type-div`}>
      <img
        className="dragonball-type"
        id={type.toLowerCase()}
        src={`${import.meta.env.BASE_URL}/type_icons/${type.toLowerCase()}.png`}
        alt={type}
      />
      <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
    </div>
  );
};

export default DragonBallType;
