import { StyleSheet } from "react-native";
import { fonts, nf, wpx, hpx, colors } from "../../../constants/constant";

export const AccountTypeStyles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FFFFFF", borderWidth: 1 },
  container: { marginHorizontal: wpx(20), marginTop: wpx(20) },

  mainHeading: { color: colors.black },
  description: { color: "#6F6F6F", width: wpx(330), marginTop: hpx(10), marginBottom: hpx(30) },
  accountTypeView: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#F3F5F9",
    // height: wpx(180),
    borderRadius: wpx(10),
    marginVertical: hpx(10),
    paddingVertical: wpx(10),
  },
  subContainer: { marginVertical: wpx(10) },
  typeDescription: {
    flexWrap: "wrap",
    fontFamily: fonts.regular,
    color: colors.black,
    textAlign: 'justify',
    width: wpx(230)
  },
  heading: { color: colors.black, marginTop: wpx(20) },
  detailView: { flexDirection: "row", marginHorizontal: wpx(21) },
  rowContainer: {
    flexDirection: "row",
    marginHorizontal: wpx(21),
    marginTop: hpx(30),
  },
  iconStyle: { height: hpx(20), width: wpx(20), resizeMode: "contain" },
});
