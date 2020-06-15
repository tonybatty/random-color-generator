import React, { Component } from "react"
import "./Home.css"

const randomColor = require("randomcolor")

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      randomColorHex: randomColor(),
      hueArray: [
        {
          color: "red",
          hex: "#cc362e",
        },
        {
          color: "orange",
          hex: "#e86519",
        },
        {
          color: "yellow",
          hex: "#f7df09",
        },
        {
          color: "green",
          hex: "#0c962c",
        },
        {
          color: "blue",
          hex: "#062e66",
        },
        {
          color: "purple",
          hex: "#530282",
        },
        {
          color: "pink",
          hex: "#e20ec7",
        },
        {
          color: "monochrome",
          hex: "#727272",
        },
      ],
      selectedHue: "",
      selectedLuminosity: "",
    }

    this.clickBackground = this.clickBackground.bind(this)
    this.clickHue = this.clickHue.bind(this)
  }

  clickBackground(e) {
    e.preventDefault()
    this.setState({
      color: randomColor({
        luminosity: this.state.selectedLuminosity
          ? this.state.selectedLuminosity
          : null,
        hue: this.state.selectedHue ? this.state.selectedHue : null,
      }),
    })
  }

  clickHue(e, hue) {
    e.stopPropagation()
    console.log("click hue")
    if (this.state.selectedHue !== hue) {
      this.setState({
        hue,
      })
    } else {
      this.setState({
        hue: "",
      })
    }
  }

  render() {
    return (
      <div
        className="container"
        style={{ backgroundColor: this.state.randomColorHex }}
        onClick={(e) => this.clickBackground(e)}
      >
        <div className="hex-code">{this.state.randomColorHex}</div>

        <div className="hue-button-group">
          {this.state.hueArray.map((hue, index) => (
            <div
              key={index}
              className={
                this.state.hue === hue.color
                  ? "hue-button hue-button--selected"
                  : "hue-button"
              }
              style={{
                backgroundColor: hue.hex,
              }}
              onClick={(e) => this.clickHue(e, hue.color)}
            ></div>
          ))}
        </div>
      </div>
    )
  }
}
