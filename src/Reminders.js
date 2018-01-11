import React, { Component } from 'react';

import './Reminders.css'

function Item({text, isCompleted, onComplete}) {
  return (
    <div className='string'>
      <div className='checkbox'>
        <div className={'checkbox-circle ' + (isCompleted ? 'isCompleted' : '')} onClick={onComplete}></div>
      </div>
      <div className={'text ' + (isCompleted ? 'isCompleted' : '')}>
        {text}
      </div>
    </div>
  )
}

class Reminders extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      typingText: '',
    };
  }

  handleTextChange = (event) => {
    this.setState({ typingText: event.target.value });
  };

  handleAddItem = (event) => {
    event.preventDefault();

    if (this.state.typingText === '') return;

    const item = {isCompleted: false, text: this.state.typingText}
    // a = [1]
    // a.concat(2) => [1,2]
    // [...a, 1] => [1,2]
    const newItems = this.state.items.concat(item)

    this.setState({ items: newItems, typingText: '' })
  }

  onComplete = (index) => {
    const { items } = this.state;

    const newItems = items.map((item, _index) => {
      if (_index === index) {
        return { isCompleted: !item.isCompleted, text: item.text }
      } else {
        return item
      }
    });

    this.setState({ items: newItems})
    console.log(items.indexOf(index.isCompleted))
  }

  render () {
    return (
      <div className='reminders'>
          <form className='add-field' onSubmit={this.handleAddItem}>
            <input
              type="text"
              value={this.state.typingText}
              onChange={this.handleTextChange}
            />
            <button type='submit' className='add-button'>+</button>
          </form>
        <div className='list'>
          {this.state.items.map((item, index) => (
            <Item
              text={item.text}
              isCompleted={item.isCompleted}
              onComplete={() => this.onComplete(index)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Reminders;
