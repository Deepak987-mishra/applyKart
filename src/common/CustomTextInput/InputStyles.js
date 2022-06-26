import { StyleSheet } from "react-native";
import { wpx, hpx, nf, fonts, colors, wp } from "../../constants/constant";
export default InputStyles = StyleSheet.create({
  textInputViewStyle: {
    width: wpx(335),
    height: wpx(50),
    borderRadius: wpx(8),
    justifyContent: "center",
    backgroundColor: colors.offWhite,
  },
  timeInputViewStyle: {
    width: wpx(162),
    height: hpx(50),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wpx(20),
    marginTop: hpx(10),
    borderRadius: wpx(8),
    backgroundColor: colors.offWhite,
  },
  timeInputStyle: {
    fontSize: nf(14),
    color: "#000",
    fontFamily: fonts.regular,
    width: wpx(100),
  },
  textInputStyle: {
    marginLeft: wpx(10),
    fontSize: nf(14),
    color: "#000",
    fontFamily: fonts.regular,
    width: wpx(280),
  },
  eyeIconStyle: {
    marginRight: wpx(20),
  },
  mobileInputMainView: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryCodeButtonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: wp(15),
    marginLeft: wpx(10),
  },
  textInputMobileStyle: {
    marginLeft: wp(1),
    fontSize: nf(14),
    color: "#000000",
    height: "100%",
    fontFamily: fonts.regular,
    width: wp(80),
  },
  modalSafeView: {
    marginHorizontal: wpx(15),
    marginBottom: wpx(15),
  },
  renderItemMainView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hpx(10),
  },
  countryTextStyle: {
    fontSize: nf(14),
    fontFamily: fonts.regular,
  },
  countryDialCodeStyle: {
    fontSize: nf(14),
    fontFamily: fonts.bold,
    width: wp(14),
  },
  countryFlagStyle: {
    fontSize: nf(14),
    fontFamily: fonts.regular,
    width: wp(8),
  },
  searchInputViewStyle: {
    height: wpx(50),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.offWhite,
    borderRadius: wpx(8),
    alignContent: "center",
  },
  dollarInputViewStyle: {
    height: wpx(50),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.offWhite,
    borderRadius: wpx(8),
    alignContent: "center",
  },
  searchInputStyle: {
    fontSize: nf(14),
    fontFamily: fonts.regular,
    width: wp(100),
    color: "black",
    marginTop: wpx(3),
  },
  searchIconStyle: {
    marginHorizontal: wpx(10),
  },
});
