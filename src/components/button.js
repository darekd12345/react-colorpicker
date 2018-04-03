import React from "react";

import button from "../styles/button.css";

const Button = (props) => {
  return (
    <div className="button button-inversed">
      {props.text}
    </div>
  );
};

export default Button;