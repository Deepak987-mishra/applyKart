import { StyleSheet } from "react-native";
import { fonts, wpx, hpx, nf, wp, hp, colors } from "../../../../constants/constant";

export const SeekerJobFilterStyles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { marginHorizontal: wpx(20), marginTop: wpx(30) },
  mainFilterShadowView: {
    height: hp(100),
    borderTopRightRadius: wpx(20),
    borderTopLeftRadius: wpx(20),
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 4,
    marginTop: hpx(20),
  },
  filterInsideView: {
    marginHorizontal: wpx(20),
    marginTop: hpx(30),
  },
  jobTypeMainView: {
    flexDirection: "row",
    width: wp(50),
    marginVertical: hpx(10),
  },
  categoryTouchView: {
    flexDirection: "row",
    width: wp(44),
    marginVertical: hpx(10),
    flexWrap: "wrap",
    alignSelf: "center",
  },
  typetextStyle: {
    marginTop: hpx(20),
    marginBottom: hpx(10),
  },
  salaryRangeView: { marginVertical: hpx(10) },
});
