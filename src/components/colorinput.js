import React from "react";

class ColorInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.target.select();
        document.execCommand("Copy");
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
    }

    render() {
        return (
            <div className="colorinput">
                <label>
                    {this.props.name}
                </label>
                <input 
                    readOnly
                    type="text"
                    onClick={this.handleClick} 
                    value={this.props.color} 
                />
            </div>
        )
    }
}

export default ColorInput;