import React from "react";

import colorpicker from "../styles/colorpicker.css";
import input from "../styles/input.css";

import Button from "./button";


const Slider = (props) => {
    return (
        <div className="rainbow">
            <div className="dot dot-large" onClick={props.handleDrag}/>
        </div>
    );
  };

const ColorInput = (props) => {
    return (
        <div className="colorinput">
            <label>
                {props.name}:
                <input type="text" value="255, 255, 255" name={props.name} />
            </label>
        </div>
    )
}

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleDrag = this.handleDrag.bind(this);
    }

    handleDrag (event) {
        console.log("drag");
    } 

    render() {
        return (
            <div className="colorpicker">
                <div className="colorpicker-area">
                    <div className="dot" onDrag={this.handleDrag} />
                </div>
                <Slider handleDrag={this.handleDrag} />
                <div className="input-container">
                    <ColorInput name="RGB" />
                    <ColorInput name="HSL" />
                    <ColorInput name="HEX" />
                    <Button text="Copy" />
                </div>
                <div className="button-container">
                    <Button text="Select" />
                    <Button text="Cancel" />
                </div>
            </div>
        );
    }
}

export default ColorPicker;