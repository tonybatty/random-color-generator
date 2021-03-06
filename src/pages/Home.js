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
    this.checkIfDarkText = this.checkIfDarkText.bind(this)
    this.generateRandomColor = this.generateRandomColor.bind(this)
  }

  componentDidMount() {
    this.generateRandomColor(false)
    setTimeout(() => {
      if (this.state.textColor === "#000000") {
        StatusBar.setStyle({ style: StatusBarStyle.Light })
      } else {
        StatusBar.setStyle({ style: StatusBarStyle.Dark })
      }
      SplashScreen.hide()
    }, 750)
  }

  clickBackground(e) {
    e.preventDefault()
    this.generateRandomColor(true)
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

  checkIfDarkText(bgColor) {
    var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor
    var r = parseInt(color.substring(0, 2), 16)
    var g = parseInt(color.substring(2, 4), 16)
    var b = parseInt(color.substring(4, 6), 16)
    return r * 0.299 + g * 0.587 + b * 0.114 > 120
  }

  generateRandomColor(changeStatusBarColor) {
    let hexColor = ""
    let textColor = ""

    hexColor = randomColor({
      luminosity: this.state.selectedLuminosity
        ? this.state.selectedLuminosity
        : null,
      hue: this.state.selectedColor ? this.state.selectedColor : null,
    }).toUpperCase()

    if (this.checkIfDarkText(hexColor)) {
      textColor = "#000000"
      if (changeStatusBarColor) {
        StatusBar.setStyle({ style: StatusBarStyle.Light })
      }
    } else {
      textColor = "#FFFFFF"
      if (changeStatusBarColor) {
        StatusBar.setStyle({ style: StatusBarStyle.Dark })
      }
    }

    this.setState({
      hexColor,
      textColor,
    })
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
