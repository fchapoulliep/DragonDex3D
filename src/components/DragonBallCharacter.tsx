/**
 * Importing React, the Loader component, the DragonBallType component, and the Link component.
 */
import React, { useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import dragonBallList from "../data/dragoncharacters.json";
import Loader from "./Loader";
import * as THREE from "three";
import "../css/dragonballcharacter.css";
import DragonBallType from "./DragonBallType";
import { Link } from "react-router-dom";

/**
 * Interface for the DragonBallProps type, which includes the Character ID.
 */
interface DragonBallProps {
  dragonBallId: string;
}

/**
 * Interface for the DragonBallModelProps type, which includes the model path and Character ID.
 */
interface DragonBallModelProps {
  modelPath: string;
}

/**
 * Component that renders a 3D model of a Dragon Ball Character using the provided model path and Character ID.
 * It handles loading the model, playing idle animations, and adjusting the model's scale and materials.
 *
 * @component
 * @param {DragonBallModelProps} props - The properties for the DragonBallModel component.
 * @param {string} props.modelPath - The path to the 3D model file.
 * @returns {JSX.Element} The rendered 3D model of the Dragon Ball Character.
 */
const DragonBallModel: React.FC<DragonBallModelProps> = ({ modelPath }) => {
  const { scene, animations } = useGLTF(modelPath);
  const mixer = new THREE.AnimationMixer(scene);

  useEffect(() => {
    if (animations.length > 0) {
      const idleAnimation = animations.find(
        (clip) =>
          clip.name.toLowerCase().includes("idle") ||
          clip.name.toLowerCase().includes("wait") ||
          clip.name === "0"
      );
      const action = mixer.clipAction(idleAnimation || animations[0]);
      action.play();
    }

    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(scene);
    };
  }, [animations, mixer, scene]);

  useFrame((_, delta) => {
    mixer.update(delta);
  });

  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene);
      const size = new THREE.Vector3();
      box.getSize(size);

      const delta = Math.min(1.0 / size.x, 1.0 / size.y, 1.0 / size.z);
      scene.scale.set(delta, delta, delta);
    }
  }, [scene]);

  return <primitive object={scene} scale={0.25} position={[0, -2, 0]} />;
};

/**
 *  Component that renders a Dragon Ball Character page with a 3D model, description, and type information.
 * @param dragonBallId The ID of the Character to display.
 * @returns The Dragon Ball Character page with the 3D model, description, and type information.
 */
const DragonBallCharacter: React.FC<DragonBallProps> = ({ dragonBallId }) => {
  const dragonballcharacter = dragonBallList.find(
    (p) => p.id === parseInt(dragonBallId)
  );
  const [loading, setLoading] = React.useState(true);

  const dragonballcharacterName = dragonballcharacter
    ? dragonballcharacter.name
    : "";

  const modelPath = useMemo(
    () =>
      `${
        import.meta.env.BASE_URL
      }models/${dragonballcharacterName}/${dragonballcharacterName}.glb?v=${new Date().getTime()}`,
    [dragonballcharacterName]
  );

  useEffect(() => {
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.classList.remove("animation");
    }
    setLoading(false);
  }, [modelPath]);

  if (!dragonballcharacter) {
    return (
      <div
        style={{
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        The Dragon Ball Character does not exist
        <Link to="/">Go back to the DragonDex</Link>
      </div>
    );
  }

  useEffect(() => {
    const loader = document.querySelector(".loader");
    if (loader && !loading) {
      setTimeout(() => {
        loader.classList.add("animation");
      }, 1500);
    }
  });

  return (
    <div
      id="dragonball-overlay"
      style={{
        backgroundImage: `url(${
          import.meta.env.BASE_URL
        }backgrounds/${dragonballcharacter.saga.toLowerCase().replace(/ /g, "-")}.png)`,
        backgroundPosition: "bottom",
        backgroundSize: "cover",
      }}
    >
      <Loader />
      <div className="dragonball-description">
        <h2>{dragonballcharacter.name}</h2>
        <p>{dragonballcharacter.description}</p>
      </div>
      <div className="dragonball-types">
        <DragonBallType
          key={dragonballcharacter.type}
          type={dragonballcharacter.type}
        />
      </div>

      <Canvas style={{ background: "transparent" }} shadows key={modelPath}>
        <ambientLight intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={2} castShadow />
        <directionalLight position={[5, 5, -5]} intensity={2} castShadow />
        <OrbitControls
          enableDamping
          dampingFactor={0.25}
          minDistance={2}
          maxDistance={6}
          autoRotate
        />
        <DragonBallModel modelPath={modelPath} />
      </Canvas>
    </div>
  );
};

export default DragonBallCharacter;
