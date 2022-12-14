import "./App.css";
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Album from "./components/Album/Album";
import Artist from "./components/Artist/Artist";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/album/:albumId" element={<Album />} />
          <Route path="/artist/:artistId" element={<Artist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
