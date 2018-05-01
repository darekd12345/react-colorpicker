import React from "react";

const Slider = (props) => {
    let barStyle = {
        top: props.barY
    }

    return (
        <div className="rainbow" onMouseDown={props.handleMouseDown}>
            <div className="dot dot-large" style={barStyle} />
        </div>
    );
};

export default Slider;