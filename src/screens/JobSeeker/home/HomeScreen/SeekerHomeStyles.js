import { StyleSheet } from "react-native";
import { fonts, wpx, hpx, nf, wp, hp, colors } from "../../../../constants/constant";
export const SeekerHomeStyles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { marginHorizontal: wpx(15), marginVertical: wpx(15) },
  mainHeading: { fontSize: nf(22), fontFamily: fonts.semiBold, color: colors.black },
  description: {
    fontSize: nf(15),
    fontFamily: fonts.regular,
    color: "#6F6F6F",
    width: wp(90),
    marginTop: hpx(5),
    marginBottom: hp(2),
  },
  seekerProfilePic: {
    height: wpx(52),
    width: wpx(52),
    borderRadius: wpx(10),
    alignSelf: "center",
  },
  jobFilterIcon: {
    flex: 1,
    marginLeft: wpx(10),
    justifyContent: "center",
    alignItems: "center",
    height: wpx(52),
    width: wpx(52),
    borderRadius: wpx(10),
    backgroundColor: colors.black,
  },
  jobNearestDesc: { marginLeft: wpx(20), marginTop: hpx(10) },
  newJobmainView: {
    flexDirection: "row",
    width: wp(100),
    marginVertical: hpx(10),
  },
  newJobImageView: {
    marginTop: hpx(10),
    height: wpx(50),
    width: wpx(50),
    borderWidth: 1,
    borderColor: "#55555533",
    borderRadius: wpx(10),
    justifyContent: "center",
    alignItems: "center",
  },
  newjobPostView: { alignSelf: "center", marginLeft: wpx(10), width: wp(75) },
  flexRowBetween: { flexDirection: "row", justifyContent: "space-between" },
  jobDetailShadowView: {
    backgroundColor: "#FFFFFF",
    height: wpx(161),
    width: wpx(285),
    borderRadius: wpx(15),
    shadowColor: "#4C4C4C",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
    padding: wpx(10),
    marginRight: wpx(15),
    marginVertical: hpx(20),
  },
  renderJobTypemainView: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: wpx(13),
  },
  rendeJobImage: { height: wpx(74), width: wpx(74), borderRadius: wpx(10) },
  centerTheImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  workTypeMainView: {
    borderWidth: 1,
    flexDirection: "row",
    padding: wpx(8),
    borderRadius: wpx(30),
    marginRight: wpx(10),
  },
  workTypeLinearView: { height: wpx(35), width: wpx(46), borderRadius: wpx(30), marginRight: wpx(10) },
});
