import React, { Component } from 'react';
import {
  Button,
  ActionSheetIOS,
  TouchableOpacity,
  Text,
  Platform,
  Picker
} from 'react-native';
import FullButton from './FullButton';

export default class VariantSelector extends Component {
  showActionSheet = () => {
    let sizeLabels = [];
    sizeLabels.push('CANCEL');
    this.props.variants.edges.map(variant =>
      sizeLabels.push(variant.node.title.toUpperCase())
    );
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: sizeLabels,
          cancelButtonIndex: 0
        },
        buttonIndex => {
          if (buttonIndex > 0) {
            this.props.handleOptionChange(sizeLabels[buttonIndex]);
          }
        }
      );
    }
    if (Platform.OS === 'android') {
      <Picker
        style={{ width: 100 }}
        selectedValue={this.props.selectedVariant}
        onValueChange={(itemValue, itemIndex) =>
          this.props.handleOptionChange(sizeLabels[itemIndex])
        }
      >
        {sizeLabels.map((elem, index) => {
          <Picker.Item label={elem} value={elem} />;
        })}
      </Picker>;
    }
  };

  sizeSelectorLabel = () => {
    return this.props.selectedVariant === null
      ? 'SELECT A SIZE'
      : `SIZE: ${this.props.selectedVariant}`;
  };

  render() {
    return (
      <FullButton
        style={{ marginTop: 20 }}
        onPress={this.showActionSheet}
        text={`${this.sizeSelectorLabel()}`}
      />
    );
  }
}
