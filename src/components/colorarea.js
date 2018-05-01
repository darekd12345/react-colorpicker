import React from "react";

import area from "../styles/area.css";

class Area extends React.Component {
    constructor(props) {
        super(props);
        this.colorAreaRef = React.createRef();
        this.handleWindowResize = this.handleWindowResize.bind(this);
    }

    handleWindowResize() {
        this.props.passRefs(this.colorAreaRef);
    }

    componentDidMount() {
        this.props.passRefs(this.colorAreaRef);
        window.addEventListener("resize", this.handleWindowResize)
    }

    render() {
        let dotStyle = {
            top: this.props.dotY,
            left: this.props.dotX
        }

        let areaStyle = {
            background: "linear-gradient(to right, white, hsl("+ this.props.hue +", 100%, 50%) )"
        }
        
        return (
            <div className="colorpicker-area" onMouseDown={this.props.handleMouseDown}
                onClick={this.props.handleClick}
                ref={this.colorAreaRef} 
                style={areaStyle}>
                <div className="dot" style={dotStyle} />
            </div>
        );
    }
}

export default Area;