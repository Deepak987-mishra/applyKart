import { StyleSheet } from "react-native";
import { fonts, wpx, hpx, nf, wp, hp, colors } from "../../../../constants/constant";

export const FAQStyles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  listContainer: { marginHorizontal: hpx(20) },
  queContainer: {
    flexDirection: "row",
    marginTop: hpx(20),
    backgroundColor: "#F6F5FB",
    borderRadius: wpx(8),
    height: hpx(51),
    width: wpx(335),
  },
  listHeading: { marginLeft: hpx(15), justifyContent: "center", flex: 1 },
  queIcon: { justifyContent: "center", alignItems: "center", flex: 0.1 },
  ansContainer: { marginTop: hpx(8), marginLeft: hpx(15) },
});
