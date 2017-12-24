import React from 'react';

class Hello extends React.Component {
  conLog(text) {
    console.log(text);
  }

  render() {
    let name = 'HEROPY';
    return (
      <div>
        <h2>Hello {name}</h2>
        <button onClick={ () => this.conLog(name) }>CLICK!!</button>
      </div>
    )
  }
}

export default Hello;