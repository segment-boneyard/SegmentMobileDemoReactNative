import React, { Component } from 'react';
import { Text,
         Image,
         View,
         Button,
         TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from './Styles/LaunchScreenStyles'
import VariantSelector from '../Components/VariantSelector';
import ShopifyActions from '../Redux/ShopifyRedux';

export class ProductDetailScreen extends Component {

  static navigationOptions = ({navigation}) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    this.currentVariant = {
      productId: params.id,
      productImage: params.variants.edges[0].node.image.src,
      title: params.title,
      price: params.variants.edges[0].node.price,
      variant: null,
    };
  }

  handleVariantChange = (variant) => {
    // called when the product variant selector is changed
    this.currentVariant.variant = variant;
    this.props.variantSelected(variant);
  }

  handleAddToCart = () => {
    if(this.currentVariant.variant) {
      this.props.addToCart(this.currentVariant);
    }
  }

  handleAddToWishlist = () => {
  }

  componentWillUnmount = () => {
    this.props.clearVariant();
  }

  render() {
    // TODO: This is kind of hacky and unsafe but for now...will have to do...
    const {params} = this.props.navigation.state;
    return (
      <View style={{flex: 1}}>
        // Header
        <View style={{height: 75, backgroundColor: 'white', flexDirection: 'row', alignItems: 'baseline'}}>
          <View style={{flex: 0.1}}/>  // Back Button
          <View style={{flex: 0.8}}>
            <Text style={{fontSize: 20, textAlign: 'center', marginTop: 40}}>{"PRODUCT"}</Text>
          </View>
          <View style={{flex: 0.1}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image style={{ height: 20, width: 20, marginRight: 20, marginTop: 40}} source={require('../Images/Icons/handbag-32.png')}/>
            </TouchableOpacity>
          </View>
        </View>
        // Bottom thin line
        <View style={{ backgroundColor: '#43464b', height: 2, width: '100%' }}/>
        // Content
      <View style={{flex: 1, marginTop: 5}}>
        <View style={{flex: 0.2, flexDirection: 'row', margin: 5}}>
          <Text style={styles.itemLabel}>
            {params.title}
          </Text>
          <Text style={styles.itemPrice}>
            {`$${params.variants.edges[0].node.price}`}
          </Text>
        </View>
        <View style={{flex: 0.8, flexDirection: 'column', margin: 5}}>
          <Image
            style={styles.imageStyle}
            source={{uri: `${params.variants.edges[0].node.image.src}`}}/>
          <VariantSelector
            variants={params.variants}
            selectedVariant={this.props.selectedVariant}
            handleOptionChange={this.handleVariantChange}/>
      </View>
      </View>
      // Footer
      // Bottom thin line
      <View style={{ backgroundColor: '#43464b', height: 2, width: '100%' }}/>
      // Footer
      <View style={{flex: 0.2, backgroundColor: 'white', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flex:1, flexDirection: 'row'}}>
          <Button onPress={this.handleAddToCart} title={'ADD TO CART'}/>
          <Button onPress={this.handleAddToWishlist} title={'ADD TO WISHLIST'}/>
        </View>
      </View>
    </View>
    );
  }
}

const mapStateToProps = state => {
  return { selectedVariant: state.shopify.selectedVariant,
  cart: state.shopify.cart,
  products: state.shopify.products, };
};

const mapDispatchToProps = dispatch => ({
  variantSelected: (variant) => {
    dispatch(ShopifyActions.variantSelected(variant)); },
  clearVariant: () => {
    dispatch(ShopifyActions.variantSelected(null));
  },
  addToCart: (variant) => {
    dispatch(ShopifyActions.addToCart(variant)); },
  });

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailScreen);
