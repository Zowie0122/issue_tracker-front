import React from "react";
import { Button } from "react-bootstrap";
import { FcAbout } from "react-icons/fc";

function App() {
  return (
    <div>
      Issue Tracker APP
      <Button as="a" variant="success">
        Button as link
      </Button>
      <FcAbout />
    </div>
  );
}

export default App;
