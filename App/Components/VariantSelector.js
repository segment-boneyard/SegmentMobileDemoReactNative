import React, { Component } from 'react';
import { Picker } from 'react-native';

export default class VariantSelector extends Component {
  render() {
    return (
      // TODO: Change this to an https://facebook.github.io/react-native/docs/actionsheetios.html
      <Picker
        onValueChange={this.props.handleOptionChange}>
        {this.props.variants.edges.map((variant) => {
          return (
            <Picker.Item value={variant.node.title} label={`${variant.node.title}`}/>
          ); })}
      </Picker>
    );
  }
}
