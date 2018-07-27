import React, { Component } from 'react';
import { Text,
         Image,
         View,
         Button } from 'react-native';
import { connect } from 'react-redux';
import styles from './Styles/LaunchScreenStyles'
import VariantSelector from '../Components/VariantSelector';
import ShopifyActions from '../Redux/ShopifyRedux';

export class ProductDetailScreen extends Component {

  handleVariantChange = () => {
    // called when the product variant selector is changed
  }

  handleAddToCart = () => {

  }

  handleAddToWishlist = () => {

  }

  render() {
    // TODO: This is kind of hacky and unsafe but for now...will have to do...
    const {params} = this.props.navigation.state;
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.itemTitleBar}>
          <Text style={styles.itemLabel}>
            {params.title}
          </Text>
          <Text style={styles.itemPrice}>
            {`$${params.variants.edges[0].node.price}`}
          </Text>
        </View>
        <Image
          style={styles.imageStyle}
          source={{uri: `${params.variants.edges[0].node.image.src}`}}/>
        <VariantSelector
          productId={params.id}
          productTitle={params.title}
          variants={params.variants}
          selectedVariant={this.props.selectedVariant}
          handleOptionChange={this.handleVariantChange}/>
        <Button
          onPress={this.handleAddToCart}
          title={'ADD TO CART'}/>
        <Button
          onPress={this.handleAddToWishlist}
          title={'ADD TO WISHLIST'}/>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  selectedVariant: state.shopify.selectedVariant,
  cart: state.shopify.cart,
  products: state.shopify.products,
  selectedProduct: state.shopify.selectedProduct,
});

const mapDispatchToProps = dispatch => ({
  variantSelected: (variant) => {
    dispatch(ShopifyActions.variantSelected(variant)); },
  addToCart: (variant) => {
    dispatch(ShopifyActions.addToCart(variant)); },
  });

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen);
