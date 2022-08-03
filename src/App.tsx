import { BrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import Button from "@mui/material/Button";

function App() {
  const loggedIn = true;
  return (
    <>
      <h1>Issue Tracker APP</h1>
      <Button variant="contained">Hello World</Button>
    </>
  );
}

export default App;
