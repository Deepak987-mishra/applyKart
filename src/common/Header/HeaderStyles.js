import { StyleSheet, Platform, StatusBar } from "react-native";
import { wpx, hpx, nf, fonts, colors, wp } from "../../constants/constant";

export default HeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    //marginTop: Platform.OS == "android" ? wpx(20) : wpx(0),
    alignItems: "center",
    width: wpx(335),
    marginTop: hpx(10) + StatusBar.currentHeight,
    height: Platform.OS == "ios" ? wpx(50) : wpx(60),
    marginHorizontal: wpx(20),
  },
  title: {
    fontSize: nf(18),
    fontFamily: fonts.semiBold,
    color: colors.black,
  },
  multipleButtonMainView: {
    flexDirection: "row",
    width: wp(15),
    justifyContent: "space-between",
   
  },
});
