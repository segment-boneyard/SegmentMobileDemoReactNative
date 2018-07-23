import { StackNavigator } from 'react-navigation';
import LaunchScreen from '../Containers/LaunchScreen';
import ProductDetailScreen from '../Containers/ProductDetailScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    LaunchScreen: { screen: LaunchScreen },
    ProductDetailScreen: { screen: ProductDetailScreen },
  }, {
    // Default config for all screens
    headerMode: 'float',
    initialRouteName: 'LaunchScreen',
    navigationOptions: {
      headerStyle: styles.header,
    },
  }
);

export default PrimaryNav;
