import React from 'react';
import Header from './Header';
import Content from './Content';
import RandomNumber from './RandomNumber';
import Contact from './Contact';
import StateExample from './StateExample';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: Math.round(Math.random() * 100)
    };
    this.updateValue = this.updateValue.bind(this);
  }

  updateValue(randomValue) {
    this.setState({
      value: randomValue
    });
  }

  render () {
    return (
      <div>
        <Contact/>
      </div>
    )
  }
}

App.defaultProps = {
  greeting: 'Hello GD!!',
  isCoffee: true
};

export default App;