import React from "react";

class ColorInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onColorChange(e.target.value);
    }

    render() {
        return (
            <div className="colorinput">
                <label>
                    {this.props.name}
                </label>
                <input type="text" value={this.props.color} onChange={this.handleChange} />
            </div>
        )
    }
}

export default ColorInput;