import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NoPage from "./components/NoPage";
import TopNavbar from "./components/subcomponents/TopNavbar";
import ThemeProvider from "./components/context/ThemeProvider";
import Friends from "./components/Friends";
import Watch from "./components/Watch";
import Marketplace from "./components/Marketplace";

function App() {
  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<TopNavbar />}>
            <Route index element={<Home />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
