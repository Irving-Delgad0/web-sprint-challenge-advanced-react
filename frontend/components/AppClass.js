import React from 'react'
import axios from "axios"

export default class AppClass extends React.Component {
  state = {
    coordinateA: 2,
    coordinateB: 2,
    totalMoves: 0,
    message: "",
    email: ""
  }

  handleMoveUp = () => {
    if (this.state.coordinateA > 1) {
      this.setState({
        ...this.state,
        coordinateA: this.state.coordinateA - 1,
        totalMoves: this.state.totalMoves + 1,
        message: ""
      })
    } else {
     this.setState({
       ...this.state,
       message: "You can't go up"
     })
    }
  }

  handleMoveDown = () => {
    if (this.state.coordinateA < 3) {
      this.setState({
        ...this.state,
        coordinateA: this.state.coordinateA + 1,
        totalMoves: this.state.totalMoves + 1,
        message: ""
      })
    } else {
      this.setState({
        ...this.state,
        message: "You can't go down"
      })
    }
  }

  handleMoveRight = () => {
    if (this.state.coordinateB < 3) {
      this.setState({
        ...this.state,
        coordinateB: this.state.coordinateB + 1,
        totalMoves: this.state.totalMoves + 1,
        message: ""
      })
    } else {
      this.setState({
        ...this.state,
        message: "You can't go right"
      })
    }
  }

  handleMoveLeft = () => {
    if (this.state.coordinateB > 1) {
      this.setState({
        ...this.state,
        coordinateB: this.state.coordinateB - 1,
        totalMoves: this.state.totalMoves + 1,
        message: ""
      })
    } else {
      this.setState({
        ...this.state,
        message: "You can't go left"
      })
    }
  }

  handleReset = () => {
   this.setState({
    coordinateA: 2,
    coordinateB: 2,
    totalMoves: 0,
    message: "",
    email: ""
   })
  }

  onChange = (evt) => {
    console.log(evt.target.value)
    this.setState({
      ...this.state,
      email: evt.target.value
    })
  }

  handleSubmit = () => {
    axios.post("http://localhost:9000/api/result", {"x": this.state.coordinateB, "y": this.state.coordinateA, "steps": this.state.totalMoves, "email": this.state.email})
    .then(res => {
      this.setState({
        ...this.state,
        message: res.data.message
      })
    })
    .catch(err => {
      this.setState({
        ...this.state,
        message: err.response.data.message
      })
    })
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    this.handleSubmit();
    this.setState({
      ...this.state,
      email: ""
    })
  }


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.coordinateB}, ${this.state.coordinateA})`}</h3>
          <h3 id="steps">{this.state.totalMoves === 1 ? `You moved ${this.state.totalMoves} time` : `You moved ${this.state.totalMoves} times`}</h3>
        </div>
        <div id="grid">
          <div className= {this.state.coordinateA === 1 && this.state.coordinateB === 1 ? "square active" : "square"}>{this.state.coordinateA === 1 && this.state.coordinateB === 1 ? "B" : ""}</div>
          <div className= {this.state.coordinateA === 1 && this.state.coordinateB === 2 ? "square active" : "square"}>{this.state.coordinateA === 1 && this.state.coordinateB === 2 ? "B" : ""}</div>
          <div className= {this.state.coordinateA === 1 && this.state.coordinateB === 3 ? "square active" : "square"}>{this.state.coordinateA === 1 && this.state.coordinateB === 3 ? "B" : ""}</div>
          <div className= {this.state.coordinateA === 2 && this.state.coordinateB === 1 ? "square active" : "square"}>{this.state.coordinateA === 2 && this.state.coordinateB === 1 ? "B" : ""}</div>
          <div className= {this.state.coordinateA === 2 && this.state.coordinateB === 2 ? "square active" : "square"}>{this.state.coordinateA === 2 && this.state.coordinateB === 2 ? "B" : ""}</div>
          <div className= {this.state.coordinateA === 2 && this.state.coordinateB === 3 ? "square active" : "square"}>{this.state.coordinateA === 2 && this.state.coordinateB === 3 ? "B" : ""}</div>
          <div className= {this.state.coordinateA === 3 && this.state.coordinateB === 1 ? "square active" : "square"}>{this.state.coordinateA === 3 && this.state.coordinateB === 1 ? "B" : ""}</div>
          <div className= {this.state.coordinateA === 3 && this.state.coordinateB === 2 ? "square active" : "square"}>{this.state.coordinateA === 3 && this.state.coordinateB === 2 ? "B" : ""}</div>
          <div className= {this.state.coordinateA === 3 && this.state.coordinateB === 3 ? "square active" : "square"}>{this.state.coordinateA === 3 && this.state.coordinateB === 3 ? "B" : ""}</div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.handleMoveLeft} id="left">LEFT</button>
          <button onClick={this.handleMoveUp} id="up">UP</button>
          <button onClick={this.handleMoveRight} id="right">RIGHT</button>
          <button onClick={this.handleMoveDown} id="down">DOWN</button>
          <button onClick={this.handleReset} id="reset">reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onChange} id="email" type="email" placeholder="type email" value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
