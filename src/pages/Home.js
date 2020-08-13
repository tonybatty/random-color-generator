import React, { Component } from "react"
import { Plugins, StatusBarStyle } from "@capacitor/core"
import "./Home.scss"
const { SplashScreen, StatusBar } = Plugins

const randomColor = require("randomcolor")

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hexColor: "#FFFFFF",
      textColor: "#000000",
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
          hex: "#dec910",
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
          hex: "#d631c1",
        },
      ],
      selectedColor: "",
      selectedLuminosity: "",
    }

    this.clickBackground = this.clickBackground.bind(this)
    this.clickHue = this.clickHue.bind(this)
    this.checkIfLightText = this.checkIfLightText.bind(this)
    this.generateRandomColor = this.generateRandomColor.bind(this)
  }

  componentDidMount() {
    this.generateRandomColor()
    setTimeout(function () {
      SplashScreen.hide()
    }, 1000)
  }

  clickBackground(e) {
    e.preventDefault()
    this.generateRandomColor()
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

  checkIfLightText(bgColor) {
    var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor
    var r = parseInt(color.substring(0, 2), 16)
    var g = parseInt(color.substring(2, 4), 16)
    var b = parseInt(color.substring(4, 6), 16)
    console.log(r * 0.299 + g * 0.587 + b * 0.114)
    return r * 0.299 + g * 0.587 + b * 0.114 > 120
  }

  generateRandomColor() {
    let hexColor = randomColor({
      luminosity: this.state.selectedLuminosity
        ? this.state.selectedLuminosity
        : null,
      hue: this.state.selectedColor ? this.state.selectedColor : null,
    }).toUpperCase()

    let textColor = this.checkIfLightText(hexColor) ? "#000000" : "#FFFFFF"

    this.setState({
      hexColor,
      textColor,
    })
    StatusBar.setStyle({ style: StatusBarStyle.Light })
  }

  render() {
    return (
      <div
        className="container"
        style={{ backgroundColor: this.state.hexColor }}
        onClick={(e) => this.clickBackground(e)}
      >
        <div className="hex-code" style={{ color: this.state.textColor }}>
          {this.state.hexColor}
        </div>

        <div className="hue-button-container">
          {this.state.hueArray.map((hue, index) => (
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
          ))}
        </div>
      </div>
    )
  }
}
