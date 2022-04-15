import React, {useState} from 'react'
import axios from "axios"

export default function AppFunctional(props) {

  const [state, setState] = useState({
    coordinateA: 2,
    coordinateB: 2,
    totalMoves: 0,
    message: "",
    email: ""
  })

  

  const handleMoveUp = () => {
    if (state.coordinateA > 1) {
      setState({
        ...state,
        coordinateA: state.coordinateA - 1,
        totalMoves: state.totalMoves + 1,
        message: "",
      })
    } else {
      setState({
        ...state,
        message: "You can't go up"
      })
    }
  }

  const handleMoveDown = () => {
    if (state.coordinateA < 3) {
      setState({
        ...state,
        coordinateA: state.coordinateA + 1,
        totalMoves: state.totalMoves + 1,
        message: ""
      })
    } else {
      setState({
        ...state,
        message: "You can't go down"
      })
    }
  }

  const handleMoveRight = () => {
    if (state.coordinateB < 3) {
      setState({
        ...state,
        coordinateB: state.coordinateB + 1,
        totalMoves: state.totalMoves + 1,
        message: ""  
      })
    } else {
      setState({
        ...state,
        message: "You can't go right"
      })
    }
  }

  const handleMoveLeft = () => {
    if (state.coordinateB > 1) {
      setState({
        ...state,
        coordinateB: state.coordinateB - 1,
        totalMoves: state.totalMoves + 1,
        message: ""
      })
    } else {
      setState({
        ...state,
        message: "You can't go left"
      })
    }
  }

  const handleReset = () => {
   setState({
    coordinateA: 2,
    coordinateB: 2,
    totalMoves: 0,
    message: "",
    email: ""
   })
  }

  const onChange = (evt) => {
    setState({
      ...state,
      email: evt.target.value
    })
  }

  const handleSubmit = () => {
    axios.post("http://localhost:9000/api/result", {"x": state.coordinateB, "y": state.coordinateA, "steps": state.totalMoves, "email": state.email})
    .then(res => {
      setState({
        ...state,
        message: res.data.message,
        email: ""
      })
    })
    .catch(err => {
      setState({
        ...state,
        message: err.response.data.message
      })
    })
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    handleSubmit();
  }

  return (
    <div id="wrapper" className={props.className}>
     <div className="info">
          <h3 id="coordinates">{`Coordinates (${state.coordinateB}, ${state.coordinateA})`}</h3>
          <h3 id="steps">{state.totalMoves === 1 ? `You moved ${state.totalMoves} time` : `You moved ${state.totalMoves} times`}</h3>
        </div>
        <div id="grid">
          <div className= {state.coordinateA === 1 && state.coordinateB === 1 ? "square active" : "square"}>{state.coordinateA === 1 && state.coordinateB === 1 ? "B" : ""}</div>
          <div className= {state.coordinateA === 1 && state.coordinateB === 2 ? "square active" : "square"}>{state.coordinateA === 1 && state.coordinateB === 2 ? "B" : ""}</div>
          <div className= {state.coordinateA === 1 && state.coordinateB === 3 ? "square active" : "square"}>{state.coordinateA === 1 && state.coordinateB === 3 ? "B" : ""}</div>
          <div className= {state.coordinateA === 2 && state.coordinateB === 1 ? "square active" : "square"}>{state.coordinateA === 2 && state.coordinateB === 1 ? "B" : ""}</div>
          <div className= {state.coordinateA === 2 && state.coordinateB === 2 ? "square active" : "square"}>{state.coordinateA === 2 && state.coordinateB === 2 ? "B" : ""}</div>
          <div className= {state.coordinateA === 2 && state.coordinateB === 3 ? "square active" : "square"}>{state.coordinateA === 2 && state.coordinateB === 3 ? "B" : ""}</div>
          <div className= {state.coordinateA === 3 && state.coordinateB === 1 ? "square active" : "square"}>{state.coordinateA === 3 && state.coordinateB === 1 ? "B" : ""}</div>
          <div className= {state.coordinateA === 3 && state.coordinateB === 2 ? "square active" : "square"}>{state.coordinateA === 3 && state.coordinateB === 2 ? "B" : ""}</div>
          <div className= {state.coordinateA === 3 && state.coordinateB === 3 ? "square active" : "square"}>{state.coordinateA === 3 && state.coordinateB === 3 ? "B" : ""}</div>
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={handleMoveLeft} id="left">LEFT</button>
          <button onClick={handleMoveUp} id="up">UP</button>
          <button onClick={handleMoveRight} id="right">RIGHT</button>
          <button onClick={handleMoveDown} id="down">DOWN</button>
          <button onClick={handleReset} id="reset">reset</button>
        </div>
        <form onSubmit={onSubmit}>
          <input onChange={onChange} id="email" type="email" placeholder="type email" value={state.email}></input>
          <input data-testid="submit" id="submit" type="submit"></input>
        </form>
    </div>
  )
}
