import { StyleSheet } from "react-native";
import { icons, fonts, nf, wpx, colors, wp, hpx } from "../../../../../constants/constant";

export const VCardStartStyles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { marginHorizontal: wpx(20) },
  mainHeading: {
    fontSize: nf(22),
    fontFamily: fonts.semiBold,
    color: colors.black,
    textAlign: "center",
    width: wp(85),
    alignSelf: "center",
  },
  description: {
    fontSize: nf(15),
    fontFamily: fonts.regular,
    color: "#6F6F6F",
    width: wp(90),
    marginTop: "1%",
    marginBottom: "10%",
    alignSelf: "center",
    textAlign: "center",
  },
  formView: { marginVertical: 10 },
  termsAndCondText: { fontSize: nf(13), fontFamily: fonts.bold, color: colors.black, marginTop: 5 },
  registerWithview: { flexDirection: "row", alignSelf: "center", alignItems: "center", marginTop: "10%" },
  socialIconMainView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "60%",
    alignSelf: "center",
    marginTop: "8%",
  },
  socialMediaIconView: {
    height: "15%",
    width: "15%",
    borderWidth: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderColor: "#55555533",
    borderRadius: 15,
  },
  alreadyRegister: { flexDirection: "row", alignSelf: "center", marginTop: 100 },
  continueText: { fontSize: nf(13), fontFamily: fonts.regular, color: colors.black, marginTop: "1%" },
  forgetPassText: {
    fontSize: nf(13),
    fontFamily: fonts.semiBold,
    color: colors.black,
    textAlign: "right",
    marginTop: 15,
  },
});
