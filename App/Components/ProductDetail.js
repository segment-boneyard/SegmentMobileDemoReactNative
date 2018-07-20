import React, { Component } from 'react';

export default class ProductDetail extends Component {
  render() {
    let variantImage = this.state.selectedVariantImage || this.props.product.images.edges[0].node.src
    let variant = this.state.selectedVariant || this.props.product.variants.edges[0].node
    let variantQuantity = this.state.selectedVariantQuantity || 1
    let variant_selectors = this.props.product.options.map((option) => {
      return (
        <View>
          <Image src={variantImage} />
          <VariantSelector
            handleOptionChange={this.handleOptionChange}
            key={option.id.toString()}
            option={option}
          />
        </View>
      );
    });

    return (
      <></>
    );
  }
}
