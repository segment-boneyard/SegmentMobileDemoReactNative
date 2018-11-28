import React, { Component } from 'react';
import { FlatList, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../Containers/Styles/LaunchScreenStyles';
import { Metrics } from '../Themes';
import * as Segment from '../Analytics';

export default class ProductsGrid extends Component {
  renderItem = item => {
    onPress = () => {
      this.props.onPressItem(item.item);
    };

    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.itemContainer}>
          <Image
            style={styles.imageStyle}
            source={{ uri: `${item.item.variants.edges[0].node.image.src}` }}
          />
          <View style={styles.itemTitleBar}>
            <Text style={styles.itemLabel}>{item.item.title}</Text>
            <Text style={styles.itemPrice}>
              ${item.item.variants.edges[0].node.price}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.props.products) Segment.productListViewed(this.props.products);
    return (
      <FlatList
        data={this.props.products}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        numColumns={Metrics.productList.numColumns}
      />
    );
  }
}
