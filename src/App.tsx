import "./css/App.css";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

import DragonBallLayout from "./components/DragonBallLayout";
import DragonDex from "./components/DragonDex";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DragonDex />} />
        <Route path="/:dragonballId" element={<DragonBallLayout />} />
        <Route path="/*/*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
