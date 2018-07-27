import React, { Component } from 'react';
import { Button,
         ActionSheetIOS } from 'react-native';

export default class VariantSelector extends Component {

  showActionSheet = () => {
    let sizes = [];
    sizes.push('CANCEL');
    this.props.variants.edges.map(
      (variant) => sizes.push(variant.node.title));
    ActionSheetIOS.showActionSheetWithOptions({
      options: sizes,
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      if(buttonIndex > 0) {
        this.props.sizeSelected = sizes[buttonIndex];
        this.props.handleOptionChange(sizes[buttonIndex]);
      }
    });
  }

  sizeSelectorLabel = () => {
    return this.props.sizeSelected ? `SIZE: ${this.props.sizeSelected}` :
     'SELECT A SIZE';
  }

  render() {
    return (
      <Button
        onPress={this.showActionSheet}
        title={`${this.sizeSelectorLabel()}`}/>
    );
  }
}
