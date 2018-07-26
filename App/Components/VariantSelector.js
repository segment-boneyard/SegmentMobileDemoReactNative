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

    });
  }

  render() {
    return (
      <Button
        onPress={this.showActionSheet}
        title={'SIZE: '}/>
    );
  }
}
