import styles from "./style.css";

import React from "react";
import ReactDOM from "react-dom";

import ColorPicker from "./components/colorpicker";

const App = () => {
  return (
    <div className="main">
        <h1>Colorpicker</h1>
        <ColorPicker />
    </div>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));