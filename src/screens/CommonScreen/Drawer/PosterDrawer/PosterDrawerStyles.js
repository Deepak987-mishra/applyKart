import { StyleSheet } from "react-native";
import { fonts, nf, hp, hpx, colors, wp, wpx } from "../../../../constants/constant";

export const PosterDrawerStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  profileView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hpx(100),
    marginHorizontal: wpx(15),
  },
  profilePic: {
    height: hpx(60),
    width: wpx(60),
    resizeMode: "contain",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wpx(16),
    marginTop: hpx(25),
  },
  iconView: {
    height: hpx(20),
    width: wpx(20),
    resizeMode: "contain",
  },
  dropdownView: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wpx(16),
    marginTop: hpx(25),
  },
  arrowView: {
    height: hpx(7),
    width: wpx(12),
    resizeMode: "contain",
    marginLeft: wpx(3),
  },
  legalViewContainer: {
    marginHorizontal: wpx(45),
    marginTop: hpx(15),
  },
});
