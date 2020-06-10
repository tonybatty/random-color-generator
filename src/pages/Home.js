import React, { Component } from 'react';
import './Home.css';

const randomColor = require('randomcolor')
var color = ''

console.log("!", color)

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      color: '#eeeeee'
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
      </div>
    )
  }
}