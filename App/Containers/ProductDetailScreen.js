import React, { Component } from 'react';
import { Text,
         Image,
         View } from 'react-native';
import styles from './Styles/LaunchScreenStyles'

export default class ProductDetailScreen extends Component {
  render() {
    /*let variantImage = this.state.selectedVariantImage || this.props.product.images.edges[0].node.src
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
    });*/
    // TODO: This is kind of hacky and unsafe but for now...will have to do...
    const {params} = this.props.navigation.state;
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.itemLabel}>{params.title}</Text>
        <Text style={styles.itemPrice}>{params.variants.edges[0].node.price}</Text>
        <Image style={styles.imageStyle} source={{uri: `${params.variants.edges[0].node.image.src}`}}/>

      </View>
    );
  }
}
