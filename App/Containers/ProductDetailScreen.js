import React, { Component } from "react";
import { Text, Image, View, Button, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import styles from "./Styles/LaunchScreenStyles";
import VariantSelector from "../Components/VariantSelector";
import NavigationHeader from "../Components/NavigationHeader";
import ShopifyActions from "../Redux/ShopifyRedux";
import FullButton from "../Components/FullButton";
import * as Segment from "../Analytics";

export class ProductDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.currentVariant = {
      productId: params.id,
      productImage: params.variants.edges[0].node.image.src,
      title: params.title,
      price: params.variants.edges[0].node.price,
      variant: null
    };
  }

  handleVariantChange = variant => {
    // called when the product variant selector is changed
    this.currentVariant.variant = variant;
    this.props.variantSelected(variant);
  };

  handleAddToCart = () => {
    if (this.currentVariant.variant) {
      Segment.productAdded(this.currentVariant);
      this.props.addToCart(this.currentVariant);
      this.props.clearVariant();
    }
  };

  handleAddToWishlist = () => {};

  componentWillUnmount = () => {
    this.props.clearVariant();
  };

  render() {
    // Send an event when the product screen is shown
    Segment.productViewed(this.currentVariant);

    const { params } = this.props.navigation.state;
    return (
      <View style={{ flex: 1, backgroundColor: "rgba(255,255,255, 0.75)" }}>
        <NavigationHeader title={"PRODUCT"} navigation={this.props.navigation} />
        <View style={{ flex: 1, marginTop: 10 }}>
          <View style={{ flex: 0.1, flexDirection: "row", margin: 5, justifyContent: "space-between" }} >
            <Text style={styles.itemLabel}>{params.title}</Text>
            <Text style={styles.itemPrice}>{`$${params.variants.edges[0].node.price}`}</Text>
          </View>
          <View style={{ flex: 0.9, flexDirection: "column", marginLeft: 5, marginRight: 5 }} >
            <Image style={styles.imageStyle} source={{ uri: `${params.variants.edges[0].node.image.src}` }} />
            <Text style={{ marginTop: 20, fontSize: 18, margin: 2 }}>{params.description}</Text>
            <VariantSelector variants={params.variants} selectedVariant={this.props.selectedVariant} handleOptionChange={this.handleVariantChange} />
            <FullButton style={{ margin: 5 }} onPress={this.handleAddToCart} text={"ADD TO CART"} />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedVariant: state.shopify.selectedVariant,
    cart: state.shopify.cart,
    products: state.shopify.products
  };
};

const mapDispatchToProps = dispatch => ({
  variantSelected: variant => {
    dispatch(ShopifyActions.variantSelected(variant));
  },
  clearVariant: () => {
    dispatch(ShopifyActions.variantSelected(null));
  },
  addToCart: variant => {
    dispatch(ShopifyActions.addToCart(variant));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductDetailScreen);
