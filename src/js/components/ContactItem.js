import React from 'react';

class ContactItem extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSelect(this.props.contactKey);
  }

  render() {
    let getStyle = (isSelect) => {
      if(!isSelect) return;

      let style = {
        fontWeight: 'bold',
        backgroundColor: '#4efcd8'
      };

      return style;
    };

    return (
      <li style={getStyle(this.props.isSelected)}
        onClick={this.handleClick}>
        Name: {this.props.name}, Phone: {this.props.phone}
      </li>
    )
  }
}

export default ContactItem;