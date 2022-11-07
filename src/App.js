import "./App.css";
import Main from "./components/Main/Main";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Album from "./components/Album/Album";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/album/:id" element={<Album />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
