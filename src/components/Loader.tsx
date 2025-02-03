/**
 * Importing React and the loader CSS.
 */
import React from "react";
import "../css/loader.css";

/**
 * Loader component that displays a loading animation.
 *
 * This component includes:
 * - A Dragon Ball Radar animation.
 *
 * @component
 * @example
 * return (
 *   <Loader />
 * )
 */
const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="randar-box">
        <input type="checkbox" checked readOnly className="randar-checkbox" />
        <div className="randar-top"></div>
        <div className="randar-top-body"></div>
        <div className="randar-content">
          <div className="rander-ball"></div>
          <div className="rander-ball"></div>
          <div className="rander-ball"></div>
          <div className="rander-ball"></div>
          <div className="rander-pos"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
