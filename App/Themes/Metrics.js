import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')
const numColumns = 1;
const smallMargin = 5;

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: smallMargin,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  },
  productList: {
    numColumns: 1,
    imageSize: (width/numColumns)-smallMargin*2,
    imageRatio: 1.499,
  },
}

export default metrics
