import React, { Component } from 'react';
import { FlatList, View, Text, Dimensions, StyleSheet } from 'react-native';

const data = [
  {id: 'a', value: 'A'},
  {id: 'b', value: 'B'},
  {id: 'c', value: 'C'},
  {id: 'd', value: 'D'},
  {id: 'e', value: 'E'},
  {id: 'f', value: 'F'},
  {id: 'g', value: 'G'},
  {id: 'h', value: 'H'},
  {id: 'i', value: 'I'},
];

const numColumns = 2;
const size = Dimensions.get('window').width/numColumns;
const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
  },
  item: {
    flex: 1,
    margin: 3,
    backgroundColor: 'lightblue',
  }
});

export default class ProductsGrid extends Component {
  render () {
    return (
      <FlatList
        data={data}
        renderItem={({item}) => (
        <View style={styles.itemContainer}>
          <Text style={styles.item}>{item.value}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
      numColumns={numColumns} />
    );
  }
}
