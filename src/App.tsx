import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import ViewerEntcOutdoor from "./views/viewer_entc_outdoor";
import ViewerEntcLobby from "./views/viewer_entc_lobby";
import ViewerMobitelLab from "./views/viewer_mobitel_lab";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewer_entc_outdoor" element={<ViewerEntcOutdoor />} />
        <Route path="/viewer_entc_lobby" element={<ViewerEntcLobby />} />
        <Route path="/viewer_mobitel_lab" element={<ViewerMobitelLab />} />
      </Routes>
    </Router>
  );
}
