import React, { Component } from 'react';
import './Home.css';

const randomColor = require('randomcolor')

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: '#eeeeee',
      hue: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'monochrome']
    }

    this.handleClick = this.handleClick.bind(this)
  }



  handleClick(e) {
    this.setState({
      color: randomColor()
    })

    console.log(this.state.color)
  }

  render() {
    return (
      <div className="container" style={{ backgroundColor: this.state.color }} onClick={this.handleClick}>
        
        <div className="hex-code">{this.state.color}</div>

        <div className="hue-button-group">
          {this.state.hue.map((item, index) => (
            <div className="hue-button" style={{ backgroundColor: item }}></div>
          ))}
        </div>
      </div>
    )
  }
}