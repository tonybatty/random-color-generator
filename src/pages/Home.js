import React, { Component } from "react"
import { Plugins } from "@capacitor/core"
import "./Home.css"
const { SplashScreen } = Plugins

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
      selectedColor: "",
      selectedLuminosity: "",
    }

    this.clickBackground = this.clickBackground.bind(this)
    this.clickHue = this.clickHue.bind(this)
    this.getTextColor = this.getTextColor.bind(this)
  }

  componentDidMount() {
    setTimeout(function () {
      SplashScreen.hide()
    }, 150)
  }

  clickBackground(e) {
    e.preventDefault()
    this.setState({
      randomColorHex: randomColor({
        luminosity: this.state.selectedLuminosity
          ? this.state.selectedLuminosity
          : null,
        hue: this.state.selectedColor ? this.state.selectedColor : null,
      }),
    })
  }

  clickHue(e, hue) {
    e.stopPropagation()
    if (this.state.selectedColor !== hue) {
      this.setState({
        selectedColor: hue,
      })
    } else {
      this.setState({
        selectedColor: "",
      })
    }
  }

  getTextColor(bgColor, lightColor, darkColor) {
    var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor
    var r = parseInt(color.substring(0, 2), 16)
    var g = parseInt(color.substring(2, 4), 16)
    var b = parseInt(color.substring(4, 6), 16)
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

        <div className="hue-button-container">
          {this.state.hueArray.map((hue, index) => (
            <>
              <div className="hue-button-cell">
                <div
                  key={index}
                  className={
                    this.state.selectedColor === hue.color
                      ? "hue-button hue-button--selected"
                      : "hue-button"
                  }
                  style={{
                    backgroundColor: hue.hex,
                  }}
                  onClick={(e) => this.clickHue(e, hue.color)}
                ></div>
              </div>
              {index === 3 ? <div className="flex-break"></div> : null}
            </>
          ))}
        </div>
      </div>
    )
  }
}
