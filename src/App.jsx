import { Box } from "@mui/material";
import "./App.css";
import Header from "./components/Header";
import PhotoGrid from "./views/PhotoGrid";

function App() {
  return (
    <>
      <Box sx={{}}>
        <Header />
        <PhotoGrid />
      </Box>
    </>
  );
}

export default App;
