import "./App.css";
import HomePage from "./pages/HomePage";
import Blog from "./pages/Blog";
import { Routes, Route } from "react-router-dom";
import { SideBarContextProvider } from "./contexts/SideBarProvider";

function App() {
  return(
    <SideBarContextProvider>
      <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/blog/:fileId" element={<Blog></Blog>}></Route>
      </Routes>
    </SideBarContextProvider>
  
  )
}

export default App;
