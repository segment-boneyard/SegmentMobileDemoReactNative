import React, { Component } from "react";
import {
  Text,
  Image,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import { Images } from "../Themes";
import { connect } from "react-redux";
import ShopifyActions from "../Redux/ShopifyRedux";
import { NavigationActions } from "react-navigation";
import NavigationHeader from "../Components/NavigationHeader";
import FullButton from "../Components/FullButton";
import * as Segment from "../Analytics";

// Styles
import styles from "./Styles/LaunchScreenStyles";

class ShoppingBagScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.cartItemContainer}>
        <Image
          style={styles.cartImage}
          source={{ uri: `${item.productImage}` }}
        />
        <View style={styles.cartItemTitleBar}>
          <Text style={styles.itemLabel}>{item.title}</Text>
          <Text style={styles.itemPrice}>{item.variant}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
      </View>
    );
  };

  checkout = () => {
    // TODO: Fire checkout started event here
    Segment.checkoutStarted(this.props.cart);
    this.props.navigation.navigate("CheckoutScreen");
  };

  clearCartAndNavigate = () => {
    this.props.clearCart();
    this.props.navigation.navigate("LaunchScreen");
  };

  confirmClearCart = () => {
    Alert.alert("Confirm", "Are you sure you want to clear your cart?", [
      {
        text: "Yes",
        onPress: () => {
          this.clearCartAndNavigate();
        }
      },
      { text: "No", onPress: () => {}, style: "cancel" }
    ]);
  };

  renderCartContent = () => {
    if (this.props.cart.products.length === 0) {
      return (
        <View style={{ flex: 1, backgroundColor: "white", margin: 15 }}>
          <View style={{ flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
            <Text style={{ fontSize: 20, textAlign: "center", marginBottom: 30 }}>{"Unfortunately your shopping bag is empty."}</Text>
            <Image style={{ height: 128, width: 128 }} source={require("../Images/Icons/shopping-bag-512.png")} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: "white", marginTop: 5 }}>
            <FlatList data={this.props.cart.products} renderItem={this.renderItem} keyExtractor={item => item.productId} />
          </View>
          <View
            style={{ backgroundColor: "#43464b", height: 2, width: "100%" }}
          />
          <View
            style={{
              flex: 0.3,
              backgroundColor: "white",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start"
            }}
          >
            <View style={{ flex: 0.3, flexDirection: "row" }}>
              <Text style={{ marginTop: 15, fontSize: 20 }}>{"Your Cart Total:"}</Text>
              <Text style={{ marginTop: 15, fontSize: 20 }}>{`$${ this.props.cart.total }`}</Text>
            </View>
            <View
              style={{ flex: 0.35, flexDirection: "row", alignItems: "center" }}
            >
              <FullButton onPress={this.confirmClearCart} text={"CLEAR CART"} />
              <FullButton onPress={this.checkout} text={"CHECKOUT"} />
            </View>
          </View>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationHeader title={"YOUR BAG"} navigation={this.props.navigation} modal={true} />
        {this.renderCartContent()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    cart: state.shopify.cart,
    products: state.shopify.cart.products,
    nav: state.nav
  };
};

const mapDispatchToProps = dispatch => ({
  clearCart: () => {
    dispatch(ShopifyActions.clearCart());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShoppingBagScreen);
