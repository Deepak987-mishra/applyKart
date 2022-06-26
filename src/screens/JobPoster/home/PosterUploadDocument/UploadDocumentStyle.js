import { StyleSheet } from "react-native";
import { colors, fonts, hpx, nf, wpx } from "../../../../constants/constant";

export const UploadDocumentStyle = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },

  nextButton: {
    marginTop: hpx(30),
    flex: 1,
  },
  radioBtnmainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioBtnViewWithContent: { flexDirection: "row", marginTop: hpx(16) },
  radioBtnContentTextView: { marginLeft: wpx(10) },
  radioBtnViewWithContent1: { flexDirection: "row", marginTop: hpx(10) },
  textStyle: {
    marginTop: hpx(21),
  },
  textInputStyle: {
    marginTop: hpx(10),
  },
  abnView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hpx(21),
  },
  attachAbnView: {
    flexDirection: "row",
  },
  attachImg: {
    marginLeft: wpx(5.43),
  },
  adlView: {
    marginTop: hpx(21),
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
});
