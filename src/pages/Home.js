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
    this.getTextColor = this.getTextColor.bind(this)
  }

  clickBackground(e) {
    e.preventDefault()
    this.setState({
      randomColorHex: randomColor({
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

  getTextColor(bgColor, lightColor, darkColor) {
    var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor
    var r = parseInt(color.substring(0, 2), 16) // hexToR
    var g = parseInt(color.substring(2, 4), 16) // hexToG
    var b = parseInt(color.substring(4, 6), 16) // hexToB
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? darkColor : lightColor
  }

  render() {
    return (
      <div
        className="container"
        style={{ backgroundColor: this.state.randomColorHex }}
        onClick={(e) => this.clickBackground(e)}
      >
        <div
          className="hex-code"
          style={{
            color: this.getTextColor(
              this.state.randomColorHex,
              "#FFFFFF",
              "#000000"
            ),
          }}
        >
          {this.state.randomColorHex}
        </div>

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
