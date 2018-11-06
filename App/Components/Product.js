import React, { Component } from 'react';

export default class Product extends Component {
  render() {
    let variantImage = this.state.selectedVariantImage || this.props.product.images.edges[0].node.src
    let variant = this.state.selectedVariant || this.props.product.variants.edges[0].node
    let variantQuantity = this.state.selectedVariantQuantity || 1

    return (
      <View>
        <Image src={variantImage} />
      </View>
    );
  }
}
