import React, { Component } from 'react';
import { Button,
         ActionSheetIOS,
         TouchableOpacity,
         Text } from 'react-native';

export default class VariantSelector extends Component {

  showActionSheet = () => {
    let sizeLabels = [];
    sizeLabels.push('CANCEL');
    this.props.variants.edges.map(
      (variant) => sizeLabels.push(variant.node.title));
    ActionSheetIOS.showActionSheetWithOptions({
      options: sizeLabels,
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      if(buttonIndex > 0) {
        this.props.handleOptionChange(sizeLabels[buttonIndex]);
      }
    });
  }

  sizeSelectorLabel = () => {
    return this.props.selectedVariant === null ?
      'SELECT A SIZE' :
      `SIZE: ${this.props.selectedVariant}`;
  }

  render() {
    return (
      <TouchableOpacity style={{marginTop: 20}} onPress={this.showActionSheet}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>{`${this.sizeSelectorLabel()}`}</Text>
      </TouchableOpacity>
    );
  }
}
