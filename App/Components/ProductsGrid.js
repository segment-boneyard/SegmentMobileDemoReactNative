import React, { Component } from 'react';
import { FlatList,
         View,
         Text,
         Dimensions,
         StyleSheet,
         Image,
         TouchableOpacity } from 'react-native';

const numColumns = 1;
const defaultMargin = 5;

const size = (Dimensions.get('window').width/numColumns)-defaultMargin*2;
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    //height: size,
    flex: 1,
    flexDirection: 'column',
    margin: defaultMargin,
  },
  item: {
    flex: 1,
    margin: defaultMargin,
  },
  itemTitleBar: {
    flex: 1,
    margin: defaultMargin,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLabel: {
    margin: defaultMargin,
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPrice: {
    margin: defaultMargin,
    fontSize: 20,
  },
  imageStyle: {
    flex: 1,
    resizeMode: 'contain',
    width: size,
    height: size / 1.499,  // Hard-coded based off of sample Shopify images
  },
});

export default class ProductsGrid extends Component {

  renderItem = (item) => {

    onPress = () => {
      this.props.onPressItem(item.item);
    }

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.itemContainer}>
          <Image style={styles.imageStyle} source={{uri: `${item.item.variants.edges[0].node.image.src}`}}/>
          <View style={styles.itemTitleBar}>
            <Text style={styles.itemLabel}>{item.item.title}</Text>
            <Text style={styles.itemPrice}>${item.item.variants.edges[0].node.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <FlatList
        data={this.props.products}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        numColumns={numColumns} />
    );
  }
}
