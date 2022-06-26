import { StyleSheet } from "react-native";
import { colors, fonts, hpx, nf, wpx } from "../../../../constants/constant";

export const PosterHomeStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerStyle: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  scrollViewContainer: {
    flex: 1,
    marginHorizontal: wpx(20),
  },
  mainView: {
    flexDirection: 'row'
  },
  View1: {
    flex: 1,
    paddingTop: hpx(20)
  },
  imgView: {
    flex: 0.2
  },
  img: {
    height: wpx(52),
    width: wpx(52),
    borderRadius: wpx(8),
    marginTop: hpx(20),
    shadowColor: '#00000029',
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 6,
  },
  txtInput: {
    width: wpx(275), height: wpx(50)
  },

},
);
