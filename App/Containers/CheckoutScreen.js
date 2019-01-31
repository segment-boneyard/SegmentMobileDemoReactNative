import React, { Component } from "react";
import {
  Text,
  Image,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet
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

const style = StyleSheet.create({
  checkoutTextHeader: {},
  checkoutText: {
    fontSize: 18,
    flex: 1,
    textAlign: "center",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  checkoutHeadingText: {
    fontSize: 20,
    flex: 1,
    textAlign: "center",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  checkoutTextView: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5
  }
});

class CheckoutScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.text = "";
  }

  checkoutCompleted = () => {
    if (this.text !== "") {
      Segment.identify(this.text, this.text); // TODO: Kludge - need to find a way to generate an ID - maybe store it in redux cache
    }
    Segment.checkoutCompleted(this.props.cart);
    this.props.clearCart();
    this.props.navigation.navigate("LaunchScreen");
  };

  goBackButton = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationHeader
          title={"COMPLETE ORDER"}
          navigation={this.props.navigation}
          modal={true}
        />
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <View
            style={{
              flex: 0.5,
              flexDirection: "column",
              justifyContent: "center",
              marginTop: 5
            }}
          >
            <View style={style.checkoutTextView}>
              <Text style={style.checkoutHeadingText}>
                {"Thank you for shopping at Flash Gear!"}
              </Text>
            </View>
            <View style={style.checkoutTextView}>
              <Text style={style.checkoutText}>
                {"We appreciate your business."}
              </Text>
            </View>
            <View style={style.checkoutTextView}>
              <Text style={style.checkoutText}>{`Your order total today is: $${
                this.props.cart.total
              }.`}</Text>
            </View>
          </View>
          <View style={{ flex: 0.2, flexDirection: "column" }}>
            <View style={style.checkoutTextView}>
              <Text
                style={{
                  fontSize: 18,
                  flex: 1,
                  flexDirection: "row",
                  flexWrap: "wrap"
                }}
              >
                {"For an emailed receipt, please enter your email:"}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                margin: 5
              }}
            >
              <TextInput
                style={{
                  height: 40,
                  borderColor: "gray",
                  borderWidth: 1,
                  width: "100%"
                }}
                onChangeText={(text) => {
                  this.text = text;
                }}
              />
            </View>
          </View>
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
          <View
            style={{ flexDirection: "row", alignItems: "center", margin: 5 }}
          >
            <Text
              style={{
                marginTop: 15,
                fontSize: 16,
                flex: 1,
                flexWrap: "wrap",
                textAlign: "center"
              }}
            >
              {`Tap Complete Order to finish your purchase.`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10
            }}
          >
            <FullButton onPress={this.goBackButton} text={"GO BACK"} />
            <FullButton
              onPress={this.checkoutCompleted}
              text={"COMPLETE ORDER"}
            />
          </View>
        </View>
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
)(CheckoutScreen);
