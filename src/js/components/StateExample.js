import React from 'react';
import update from 'react-addons-update';

class StateExample extends React.Component {
  constructor() {
    super();
    this.state = {
      header: [1,2,3]
    };
    this.updateHeader = this.updateHeader.bind(this);
  }

  updateHeader() {
    this.setState({
      header: update(this.state.header, {
        $push: [999],
        $splice: [[1,1]],
        [0]: { $set: 7 }
      })
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.header}</h1>
        <button onClick={this.updateHeader}>UPDATE</button>
      </div>
    );
  }
}

export default StateExample;