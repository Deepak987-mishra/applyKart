import { StyleSheet } from "react-native";
import { wpx, hpx, nf, fonts, colors, wp } from "../../constants/constant";

export default ButtonStyles = StyleSheet.create({
  stateInputContainer: {
    flexDirection: "row",
    paddingLeft: wpx(5),

    alignItems: "center",
    alignSelf: "center",
    width: wpx(335),
    height: hpx(55),
    paddingLeft: wpx(5),
    justifyContent: "space-between",

    backgroundColor: colors.offWhite,
    borderRadius: wpx(8),

    fontFamily: fonts.regular,
  },

  dropDownIcon: {
    height: hpx(7),
    width: wpx(13),
    resizeMode: "contain",
    marginRight: wpx(20),
  },
  optionText: {
    fontSize: nf(12),
    color: colors.black,
    fontFamily: fonts,
  },
  optionsText: {
    fontSize: nf(12),
    color: colors.black,
    fontFamily: fonts.regular,
    paddingHorizontal: wpx(5),
    paddingVertical: wpx(3),
  },
  itemSeperator: {
    alignSelf: "stretch",
    width: "90%",
    marginTop: hpx(4),
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    opacity: 0.29,
    marginHorizontal: wpx(5),
  },
  titleText: {
    fontFamily: fonts.regular,
    fontSize: nf(14),
    color: colors.grey,
    opacity: 0.5,
  },
  bottomLine: {
    width: wpx(396),

    borderBottomWidth: 1,
    alignSelf: "center",
    opacity: 0.8,
  },
  optionsContainerStyle: {
    width: wpx(335),
    height: hpx(150),
    backgroundColor: colors.offWhite,
    marginTop: hpx(20),
    alignSelf: "center",
  },
  labelTextStyles: {
    justifyContent: "center",
    alignItems: "flex-start",
    fontSize: nf(14),
    fontFamily: fonts.regular,
  },
});
