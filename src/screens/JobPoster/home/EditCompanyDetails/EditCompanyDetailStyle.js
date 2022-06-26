import { StyleSheet } from "react-native";
import { fonts, wpx, hpx, nf, wp, hp, colors } from "../../../../constants/constant";

export const EditCompanyDetailStyle = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { marginHorizontal: wpx(20), marginTop: hpx(29) },

  heading2: { marginTop: hpx(15) },
  textInput: { marginTop: hpx(10) },

  abnDoc: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hpx(30),
  },
  attachAbn: {
    flexDirection: "row",
  },
  attachImg: {
    marginLeft: wpx(5.43),
  },
  frontmainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hpx(15),
  },
  backMainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hpx(20),
  },
  adlView: { marginTop: hpx(30) },
});
