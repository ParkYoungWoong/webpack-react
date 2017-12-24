import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1>{this.props.greeting}</h1>
        <div>
          Is Coffee?
          <input
            type="checkbox"
            defaultChecked={this.props.isCoffee}/>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  greeting: PropTypes.string,
  isCoffee: PropTypes.bool
};

export default Header;