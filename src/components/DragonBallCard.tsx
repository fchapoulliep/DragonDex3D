/**
 * Importing react and the Tilt component. As long as the css
 */
import React from "react";
import Tilt from "react-parallax-tilt";
import "../css/dragonballcard.css";

import { Link } from "react-router-dom";
import DragonBallType from "./DragonBallType";

/**
 * Props for the DragonBallCard component.
 *
 * @interface DragonBallCardProps
 * @property {number} id - The unique identifier for the Dragon Ball Character.
 * @property {string} name - The name of the Dragon Ball Character.
 * @property {string} type - The type of the Dragon Ball Character.
 * @property {string} saga - The saga of the Dragon Ball Character.
 */
interface DragonBallCardProps {
  id: number;
  name: string;
  type: string;
  saga: string;
}

/**
 * DragonBallCard component that displays a Dragon Ball Character card with its name, ID, types, and image.
 */
const DragonBallCard: React.FC<DragonBallCardProps> = (dragonballcharacter) => {
  return (
    <Tilt
      className={`background-stripes dragonball-cards ${dragonballcharacter.saga}`}
      glareEnable
      glareMaxOpacity={0.3}
      glareColor="white"
      glarePosition="all"
      glareBorderRadius="20px"
      scale={1.1}
    >
      <div className="inner-element">
        <Link to={`/${dragonballcharacter.id}`}>
          <div className="dragonball-types">
            <DragonBallType
              key={dragonballcharacter.type}
              type={dragonballcharacter.type}
            />
          </div>
          <p>{dragonballcharacter.name}</p>
          <img className="dragon-ball-character-image"
            src={`${import.meta.env.BASE_URL}/sprites/${
              dragonballcharacter.name
            }.png`}
            alt={dragonballcharacter.name}
          />
        </Link>
      </div>
    </Tilt>
  );
};

export default DragonBallCard;
