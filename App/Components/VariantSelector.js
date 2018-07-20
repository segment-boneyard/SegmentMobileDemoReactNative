import React, { Component } from 'react';
import { Picker } from 'react-native';

export default class VariantSelector extends Component {
  render() {
    return (
      <Picker
        selectedValue={this.state.variant}
        style={{}}
        onValueChange={this.props.handleOptionChange}>
        {this.props.option.values.map((value) => {
          return (
            <Picker.Item value={value} label={`${this.props.option.name}-${value}`}/>
          ); })}
      </Picker>

    );
  }
}
