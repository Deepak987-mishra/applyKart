import { StyleSheet } from "react-native";
import { fonts, wpx, hpx, nf, wp, hp, colors } from "../../../../constants/constant";

export const MyProfileStyle = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { marginTop: hpx(20) },
  companyheading: {
    paddingtop: hpx(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  img: { paddingTop: hpx(5), paddingRight: wpx(15) },
  companyname: { paddingTop: hpx(15) },
  location: { paddingTop: hpx(15) },
  website: { paddingTop: hpx(15) },
  textConcat: { flexDirection: "row" },
});
