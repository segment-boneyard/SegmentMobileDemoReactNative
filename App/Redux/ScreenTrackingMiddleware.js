import { NavigationActions } from 'react-navigation';
import Analytics from 'react-native-analytics';

// gets the current screen from navigation state
const getCurrentRouteName = (navigationState) => {
  if (!navigationState) {
    return null;
  }

  const route = navigationState.routes[navigationState.index];

  // dive into nested navigators
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

const screenTracking = ({ getState }) => next => (action) => {
  if (
    action.type !== NavigationActions.NAVIGATE &&
    action.type !== NavigationActions.BACK
  ) {
    return next(action);
  }

  const currentScreen = getCurrentRouteName(getState().nav);
  const result = next(action);
  const nextScreen = getCurrentRouteName(getState().nav);
  if (nextScreen !== currentScreen) {
    try {
<<<<<<< HEAD
      console.log(`NAVIGATING ${currentScreen} to ${nextScreen}`)
      // Example: Analytics.trackEvent('user_navigation', {currentScreen, nextScreen})
    } catch (e) {
      console.log(e)
=======
      console.log(`NAVIGATING ${currentScreen} to ${nextScreen}`);
      Analytics.screen(`${nextScreen}`);
    } catch (e) {
      console.log(e);
>>>>>>> add-braze-sdk
    }
  }
  return result;
}

export default screenTracking;
