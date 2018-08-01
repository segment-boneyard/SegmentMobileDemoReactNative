import React, { Component } from 'react';
import { Text,
        Image,
        View,
        ActivityIndicator } from 'react-native';
import { Metrics } from '../Themes';

class AppLoadingSplash extends Component {

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', flexDirection: 'column', margin: 15}}>
        <Image style={{width: Metrics.screenWidth - 30, resizeMode: 'contain' }} source={require('../Images/Segment_stacked_1C_RGB_rgb_600_397.png')}/>
        <Text style={{fontSize: 20}}>{'We are loading your products.'}</Text>
        <ActivityIndicator />
      </View>
    );
  }
}

export default AppLoadingSplash;
