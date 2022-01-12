import * as React from "react";
import { render } from "react-dom";
import Wizard from "./Wizard";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  // For inputs that require several values to pick from, provide value options here.
  const valuesByKey = {
    pet: {
      pets: ["dog", "cat", "hamster", "parrot", "spider", "goldfish"]
    },
    hair: {
      types: ["greasy", "moody", "munky", "dingul"]
    }
  };
  return (
    <div className="App">
      <CssBaseline />
      <Wizard values={valuesByKey} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
