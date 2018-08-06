import React, { Component } from 'react';
import { View, StatusBar, PushNotificationIOS } from 'react-native';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import { connect } from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }

    PushNotificationIOS.addEventListener('notification', (notification) => {


      // TODO:  Handle all the notification cases we could see, esp when the app
      // actually opens - a cool case would be to direct customers to a specific
      // product listing


      console.log('*********************  NEW NOTIFICATION *********************', notification);
      alert(notification._alert.body);
    });

  }

  render () {
    // This sets the bar icons to black to offset it from our white bckgnd
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='dark-content' />
        <ReduxNavigation />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer);
