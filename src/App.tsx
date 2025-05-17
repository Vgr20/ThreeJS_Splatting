import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import ViewerEntcOutdoor from "./views/viewer_entc_outdoor";
import ViewerEntcLobby from "./views/viewer_entc_lobby";
import ViewerMobitelLab from "./views/viewer_mobitel_lab";
import ViewerIndependenceSquare from "./views/viewer_independence_square";
import ViewerHatchWorks from "./views/viewer_hatch_works";
import ViewerGaneshism from "./views/viewer_ganeshism";
import ViewerGaneshismLobby from "./views/viewer_ganeshism_lobby";
import ViewerGaneshismLobbyXR from "./views/viewer_ganeshism_lobby_XR";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewer_entc_outdoor" element={<ViewerEntcOutdoor />} />
        <Route path="/viewer_entc_lobby" element={<ViewerEntcLobby />} />
        <Route path="/viewer_mobitel_lab" element={<ViewerMobitelLab />} />
        <Route
          path="/viewer_independence_square"
          element={<ViewerIndependenceSquare />}
        />
        <Route path="/viewer_hatch_works" element={<ViewerHatchWorks />} />
        <Route path="/viewer_ganeshism" element={<ViewerGaneshism />} />
        <Route
          path="/viewer_ganeshism_lobby"
          element={<ViewerGaneshismLobby />}
        />
        <Route
          path="/viewer_ganeshism_lobby_XR"
          element={<ViewerGaneshismLobbyXR />}
        />

        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
