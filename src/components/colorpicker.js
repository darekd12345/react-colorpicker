import React from "react";

// Styles
import colorpicker from "../styles/colorpicker.css";
import input from "../styles/input.css";

// Components
import Button from "./button";
import ColorInput from "./colorinput";
import Area from "./colorarea";
import Slider from "./slider";

import {hsvToHsl, hslToRgb, rgbToHex} from "./converter";

const areaSize = 200;

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);

        this.getRefs = this.getRefs.bind(this);

        this.state = {
            drag: false,
            barDrag: false,
            offsetX: 0,
            offsetY: 0,
            dotX: 0,
            dotY: 0,
            barY: 0,
            hue: 0
        };
    }

    handleMouseDown (event) {
        const targetClassList = event.target.classList;

        if (targetClassList.contains("dot-large") || targetClassList.contains("rainbow")) {
            this.setState({barDrag: true});
        } else {
            this.setState({drag: true});
        }
    }

    handleMouseUp (event) {
        this.setState({drag: false, barDrag: false});
    }

    handleMouseMove (event) {
        if (this.state.drag === true) {
            let newDotX = event.clientX - this.state.offsetX;
            let newDotY = event.clientY - this.state.offsetY;
            
            if (newDotX < 0) newDotX = 0;
            if (newDotX > areaSize) newDotX = areaSize;
            if (newDotY < 0) newDotY = 0;
            if (newDotY > areaSize) newDotY = areaSize;

            this.setState({
                dotX: newDotX,
                dotY: newDotY
            });
        }

        if (this.state.barDrag === true) {
            let newBarY = event.clientY - this.state.offsetY;

            if (newBarY < 0) newBarY = 0;
            if (newBarY > areaSize) newBarY = areaSize;

            this.setState({
                barY: newBarY
            });
        }
    }

    componentDidMount() {
        document.addEventListener("mousemove", this.handleMouseMove);
        document.addEventListener("mouseup", this.handleMouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener("mousemove");
        document.removeEventListener("mouseup");
    }

    getRefs(ref) {
        let colorAreaRect = ref.current.getBoundingClientRect();

        this.setState({offsetX: colorAreaRect.left, offsetY: colorAreaRect.top});
    }

    render() {
        const hue = Math.round(this.state.barY * 3.6 / 2);
        const saturation = Math.round(this.state.dotX / 2);
        const value = 100 - Math.round(this.state.dotY / 2);
        
        const hsl = hsvToHsl(hue, saturation, value);
        const rgb = hslToRgb(hsl);
        const hex = rgbToHex(rgb);

        const currentColorStyle = {
            backgroundColor: "hsl(" + hsl + ")"
        }

        return (
            <div className="colorpicker">
                <div className="content">
                    <Area handleClick={this.handleClick}
                        handleMouseDown={this.handleMouseDown}
                        passRefs={this.getRefs} 
                        dotX={this.state.dotX}
                        dotY={this.state.dotY}
                        hue={hue}
                     />
                    <Slider barY={this.state.barY}
                        handleMouseDown={this.handleMouseDown} />
                    <div className="input-container">
                        <ColorInput name="RGB" color={rgb} />
                        <ColorInput name="HSL" color={hsl} />
                        <ColorInput name="HEX" color={hex} />
                        <div className="current-color-dot" style={currentColorStyle} />
                    </div>
                </div>
                <div className="footer">
                </div>
            </div>
        );
    }
}


export default ColorPicker;