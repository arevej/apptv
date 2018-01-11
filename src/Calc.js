import React, { Component } from 'react';
import './Calc.css';

function addDigitToEnd(currentNumber, newDigit) {
  return parseInt(`${currentNumber}${newDigit}`)
}

class Calc extends Component {
  state = {
    selectNum: null,
    selectAction: null,
    sum: 0,
  }

  handleClick = (sign) => () => {
    const { selectNum, selectAction, sum } = this.state;

    if (typeof sign === 'number') {
      this.setState({ selectNum: selectNum == null ? sign : addDigitToEnd(selectNum, sign) });
    } else if (sign === 'c') {
      this.setState({
        selectNum: null,
        selectAction: null,
        sum: 0
      })
    } else if (selectNum != null) {
      const newSum = selectAction === '+' ? (
          sum + selectNum
        ) : selectAction === '×' ? (
          sum * selectNum
        ) : selectAction === '−' ? (
          sum - selectNum
        ) : selectAction === '÷' ? (
          sum / selectNum
        ) : selectAction == null ? (
          selectNum
        ) : sum;

      this.setState({
        selectAction: sign,
        selectNum: null,
        sum: newSum,
      });
    } else {
      this.setState({
        selectAction: sign,
      })
    }
  }

  render() {
    const signs = [
      7, 8, 9, '÷', 4, 5, 6, '×', 1, 2, 3, '−', 'c', 0, '=', '+'
    ];

    return (
      <div className='calc'>
        <div className='screen'>
          <h2>{this.state.selectNum ? this.state.selectNum : this.state.sum}</h2>
        </div>
        <div className='keyboard'>
          {signs.map((sign, index) => (
            <div key={sign} className='key' onClick={this.handleClick(sign)}>
              {sign}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Calc;
