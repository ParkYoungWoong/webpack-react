import React from 'react';

class ContactCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phone: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const nextState = {};
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  handleClick() {
    this.props.onInsert(this.state.name, this.state.phone);
    this.setState({
      name: "",
      phone: ""
    });
  }

  render() {
    return (
      <div>
        <div>
          <label htmlFor="name">NAME: </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="이름을 입력하세요!"
            value={this.state.name}
            onChange={this.handleChange}/>
        </div>
        <div>
          <label htmlFor="phone">PHONE: </label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="전화번호를 입력하세요!"
            value={this.state.phone}
            onChange={this.handleChange}/>
        </div>
        <button onClick={this.handleClick}>INSERT</button>
      </div>
    );
  }
}

export default ContactCreator;