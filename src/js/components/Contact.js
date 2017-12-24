import React from 'react';
import ContactItem from './ContactItem';
import ContactCreator from './ContactCreator';
import update from 'react-addons-update';

class Contact extends React.Component {
  constructor() {
    super();
    this.state = {
      contactData: [
        { name: 'Jane', phone: '010-0000-0001'},
        { name: 'Same', phone: '010-0000-0002'},
        { name: 'Jun', phone: '010-0000-0003'},
        { name: 'Peter', phone: '010-0000-0004'},
        { name: 'Amy', phone: '010-0000-0005'},
        { name: 'Han', phone: '010-0000-0006'}
      ],
      selectedKey: -1
    };
    this._insertContact = this._insertContact.bind(this);
    this._onSelect = this._onSelect.bind(this);
    this._isSelected = this._isSelected.bind(this);
  }

  _insertContact(name, phone){
    let newState = update(this.state, {
      contactData: {
        $push: [{"name": name, "phone": phone}]
      }
    });
    this.setState(newState);
  }

  _onSelect(key){
    if (key === this.state.selectedKey) {
      console.log("key select cancelled");
      this.setState({
        selectedKey: -1
      });
      return;
    }

    this.setState({
      selectedKey: key
    });
    console.log(key + " is selected");
  }

  _isSelected(key){
    if (this.state.selectedKey === key) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <h1>CONTACT LIST</h1>
        <ol>
          {this.state.contactData.map((currentValue, index, array) => {
            return (
              <ContactItem
                name={currentValue.name}
                phone={currentValue.phone}
                key={index}
                contactKey={index}
                onSelect={this._onSelect}
                isSelected={this._isSelected(index)}/>
            )
          })}
        </ol>
        <ContactCreator onInsert={this._insertContact}/>
      </div>
    )
  }
}

export default Contact