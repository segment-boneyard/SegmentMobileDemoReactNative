import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import App from './App/Containers/App'

// TODO: Disable the yellow warnings
console.disableYellowBox = true;

AppRegistry.registerComponent('SegmentMobileDemoReactNative', () => App)
