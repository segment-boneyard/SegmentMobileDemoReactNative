import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import ExamplesRegistry from '../Services/ExamplesRegistry'

// Note that this file (App/Components/FullButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
ExamplesRegistry.addComponentExample('Full Button', () =>
  <FullButton
    text='Hey there'
    onPress={() => window.alert('Full Button Pressed!')}
  />
)

const styles = StyleSheet.create({
  button: {
    margin: 2,
    borderWidth: 1,
    borderColor: 'black',
    padding: 7,
  }
});

export default class FullButton extends Component {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    style: PropTypes.object
  }

  render () {
    return (
      <TouchableOpacity
        style={[styles.button, this.props.style]}
        onPress={this.props.onPress}>
        <Text
          style={{fontSize: 20, textAlign: 'center'}}>
          {this.props.text && this.props.text.toUpperCase()}
        </Text>
      </TouchableOpacity>
    )
  }
}
