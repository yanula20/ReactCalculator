import React from "react"
import ReactDOM from "react-dom"
import "./index.css"

class Calculator extends React.Component {
  state = {
    displayValue: '0'
  }

  //changes the state
  inputDigit(digit) {
    const { displayValue } = this.state

    this.setState({
      displayValue: displayValue === '0' ? displayValue : displayValue + digit
    })
  }
  render() {
    const { displayValue } = this.state
    return (
      <div className="calculator">
        <div className="calculator-display">{displayValue}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button className="calculator-key key-clear">AC</button>
              <button className="calculator-key key-sign">±</button>
              <button className="calculator-key key-percent">%</button>
            </div>
            <div className="digit-keys">
              <button className="calculator-key key-0" onClick={()=> this.inputDigit(0)}>0</button>
              <button className="calculator-key key-dot">●</button>
              <button className="calculator-key key-1" onClick={()=> this.inputDigit(1)}> 1</button>
              <button className="calculator-key key-2" onClick={()=> this.inputDigit(2)}> 2</button>
              <button className="calculator-key key-3" onClick={()=> this.inputDigit(3)}> 3</button>
              <button className="calculator-key key-4" onClick={()=> this.inputDigit(4)}> 4</button>
              <button className="calculator-key key-5" onClick={()=> this.inputDigit(5)}> 5</button>
              <button className="calculator-key key-6" onClick={()=> this.inputDigit(6)}> 6</button>
              <button className="calculator-key key-7" onClick={()=> this.inputDigit(7)}> 7</button>
              <button className="calculator-key key-8" onClick={()=> this.inputDigit(8)}> 8</button>
              <button className="calculator-key key-9" onClick={()=> this.inputDigit(9)}> 9</button>
            </div>
          </div>
          <div className="operator-keys">
            <button className="calculator-key key-divide">÷</button>
            <button className="calculator-key key-multiply">×</button>
            <button className="calculator-key key-subtract">−</button>
            <button className="calculator-key key-add">+</button>
            <button className="calculator-key key-equals">=</button>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <div id="wrapper">
    <Calculator />
  </div>,
  document.getElementById("app")
)