import React from 'react';

class RandomNumber extends React.Component {
  constructor() {
    super();
    this.updateNumber = this.updateNumber.bind(this);
  }

  updateNumber() {
    let value = Math.round(Math.random() * 100);
    this.props.onUpdate(value);
  }

  render() {
    return (
      <div>
        <h1>RANDOM NUMBER = {this.props.number}</h1>
        <button onClick={this.updateNumber}>RANDOMIZE</button>
      </div>
    )
  }
}

export default RandomNumber;