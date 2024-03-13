import { Box } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import PhotoGrid from "./views/PhotoGrid";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Box sx={{}}>
        <Header />
        <PhotoGrid />
        <Navbar/>
      </Box>
    </>
  );
}

export default App;
