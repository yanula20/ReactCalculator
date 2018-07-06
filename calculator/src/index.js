import React from "react"
import ReactDOM from "react-dom"
import "./index.css"

class Calculator extends React.Component {
  state = {
    value: null,
    displayValue: '0',
    waitingForOperand: false,
    operator: null
  }

  inputDigit(digit) {
    const { displayValue, waitingForOperand } = this.state
    if(displayValue.length === 6) {
      if(waitingForOperand === true){
        this.setState({
          displayValue: String(digit),
          waitingForOperand: false
        })
      } else {
        this.setState({
          displayValue: displayValue.substring(0,5) + digit,
          waitingForOperand: false
        })
      }
    }else {
      if(waitingForOperand === true){
        this.setState({
          waitingForOperand: false,
          displayValue: String(digit)
        })
      }else {
        this.setState({
          waitingForOperand: false,
          displayValue: displayValue === '0' ? String(digit) : displayValue + digit
        })
      }
    }
  }

  inputDot() {
    const { displayValue, waitingForOperand } = this.state
    if(waitingForOperand === true) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      })
    } else {
      if (displayValue.length === 6){
        this.setState({
          displayValue: displayValue.indexOf('.') === -1 ?
          displayValue.substring(0,5) + '.'
          : displayValue.substring(0,5)
        })
      } else if (displayValue.length > 0 || displayValue.length < 6) {
        this.setState({
          displayValue: displayValue.indexOf('.') === -1 ?  displayValue + '.'
          : displayValue.substring(0,displayValue.indexOf('.'))
        })
      }
    }
  }

  toggleSign() {
    const { displayValue } = this.state
    if(displayValue === '0') {
      this.setState({
        displayValue: '-'
      })
    }else if (displayValue !== '0' && (displayValue.length < 6 || displayValue.length === 5)) {
      this.setState({
        displayValue: displayValue.charAt(0) === '-' ? displayValue.substring(1) : '-' + displayValue
      })
    }else if (displayValue.length === 6) {
        if(displayValue.charAt(0) === '-') {
            this.setState({
              displayValue: displayValue.substring(1)
            })
        }else {
          this.setState({
            displayValue: displayValue
          })
        }
     }
  }

  clearDisplay() {
    this.setState({
      displayValue: '0'
    })
  }

  inputPercent() {
    const { displayValue } = this.state

    const value = parseFloat(displayValue)

    if(displayValue.length === 6 ) {
      this.setState({
        displayValue: String(value / 100).substring(0,6)
      })
    } else {
      this.setState({
        displayValue: String(value / 100)
      })
    }
  }


  performOperation(nextOperator){
    const { displayValue, operator, value } = this.state

    const inputValue = parseFloat(displayValue)

    this.setState ({
      waitingForOperand: true,
      operator: nextOperator
    })

    const CalculatorOperations = {
      "/": (prevValue, nextValue) => prevValue / nextValue,
      "*": (prevValue, nextValue) => prevValue * nextValue,
      "+": (prevValue, nextValue) => prevValue + nextValue,
      "-": (prevValue, nextValue) => prevValue - nextValue,
      "=": (prevValue, nextValue) => nextValue
    }


    if(value === null) {
      this.setState({
        value: inputValue
      })
    } else if(operator) {
      const currentValue = value || 0
      const computedValue = CalculatorOperations[operator](currentValue, inputValue)

      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      })
    }



  }//end calc operations

  render() {
    const { displayValue } = this.state
    return (
      <div className="calculator">
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <div className="calculator-display">{displayValue}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button className="calculator-key key-clear" onClick={()=> this.clearDisplay()}>AC</button>
              <button className="calculator-key key-sign" onClick={()=> this.toggleSign()}>±</button>
              <button className="calculator-key key-percent" onClick={()=> this.inputPercent()}>%</button>
            </div>
            <div className="digit-keys">
              <button className="calculator-key key-0" onClick={()=> this.inputDigit(0)}>0</button>
              <button className="calculator-key key-dot" onClick={()=> this.inputDot()}>●</button>
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
            <button className="calculator-key key-divide" onClick={() => this.performOperation("/")}>÷</button>
            <button className="calculator-key key-multiply" onClick={() => this.performOperation("*")}>×</button>
            <button className="calculator-key key-subtract" onClick={() => this.performOperation("-")}>−</button>
            <button className="calculator-key key-add" onClick={() => this.performOperation("+")}>+</button>
            <button className="calculator-key key-equals" onClick={() => this.performOperation("=")}>=</button>
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
