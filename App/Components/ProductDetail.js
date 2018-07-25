import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';

export default class ProductDetail extends Component {
  render() {
    let variantImage = this.state.selectedVariantImage || this.props.product.images.edges[0].node.src
    let variant = this.state.selectedVariant || this.props.product.variants.edges[0].node
    let variantQuantity = this.state.selectedVariantQuantity || 1

    let variant_selectors = this.props.product.options.map((option) => {
      return (
        <View>
          <Image source={variantImage} />
          <VariantSelector
            handleOptionChange={this.handleOptionChange}
            key={option.id.toString()}
            option={option}
          />
        </View>
      );
    });

    return (
      <View>
        <Image source={{uri: `${this.props.product.variants.edges[0].node.image.src}`}}/>
      </View>
    );
  }
}
