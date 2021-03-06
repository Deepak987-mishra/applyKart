import { StyleSheet } from "react-native";
import { fonts, wpx, hpx, nf, wp, hp, colors } from "../../../../constants/constant";

export const CandidateDetailStyle = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { marginHorizontal: wpx(20), marginVertical: wpx(15) },
  workExpHeading: {
    flexDirection: "row",
    marginTop: hpx(21),
    justifyContent: "space-between",

    alignItems: "center",
  },
  workExpHeading3: { flexDirection: "row" },
  workExpIcon: { height: hpx(20), width: wpx(23.04) },
  workExpContainer: {
    flexDirection: "row",
    marginTop: hpx(15),
    justifyContent: "space-between",
  },
  workExpContainer1: {
    flexDirection: "row",
    marginTop: hpx(15),
    justifyContent:'space-between'
    
  },
  text1: { marginLeft: wpx(10.96) },
  skillHeading: { flexDirection: "row" },
  skillIcon: { height: hpx(23), width: wpx(17.19) },
  text2: { marginLeft: wpx(10.96) },
  arrowIcon2: { marginLeft: wpx(252), marginTop: hpx(6) },
  skillContainer: { flexDirection: "row", marginTop: hpx(23) },
  skillContainer2: { flexDirection: "row", flexGrow: 1 },
  fullTimeContainer: {
    backgroundColor: "#F6F5FB",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: wpx(8),
    marginRight: 10,
    padding: 8,
  },
  wireframe: {
    backgroundColor: "#F6F5FB",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0.1,
    borderRadius: wpx(8),
    marginLeft: wpx(10),
  },
  uat: {
    backgroundColor: "#F6F5FB",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 0.1,
    borderRadius: wpx(8),
    height: hpx(35),
    width: wpx(45),
    marginLeft: wpx(25),
  },
  fullTimeContainer2: {
    backgroundColor: "#F6F5FB",
    height: hpx(35),
    width: wpx(122),
    borderRadius: wpx(8),
    alignItems: "center",
    justifyContent: "center",
    marginTop: hpx(10),
  },
  horizontalLine: {
    height: 1,
    width: wpx(335),
    alignSelf: "center",
    backgroundColor: "#00000029",
    marginVertical: wpx(15),
  },
  arrowIcon: { marginTop: hpx(7) },
  jobPreferenceIcon: { height: hpx(20), width: wpx(23.04) },
  educationIcon: { height: hpx(20), width: wpx(22.04) },
  text3: { marginLeft: wpx(10.96) },
  text4: { marginLeft: wpx(10.96) },
  text5: { marginLeft: wpx(10.96) },
  eduContainer: { flexDirection: "row", marginTop: hpx(15), justifyContent: "space-between" },
  arowRight3: { marginTop: hpx(4) },
  img: { height: hpx(223), width: wpx(335), marginTop: hpx(20) },
  arrowRight4: { marginTop: hpx(4) },
  availabilityIcon: { height: hpx(20), width: wpx(19.82) },
  contactIcon: { height: hpx(20), width: wpx(16.03) },
  text6: { marginLeft: wpx(10.96) },
  arrowRight7: { marginLeft: wpx(186), marginTop: hpx(4) },
  btnContainer: { flexDirection: "row", marginBottom: wpx(20), justifyContent: "center" },
  btnContainer1: { flexDirection: "row", marginHorizontal: wpx(30), marginBottom: wpx(20) },
  isWorkedBeforeView: {
    width: wp(80),
    marginLeft: wpx(25),
  },
  vcardCompanyNameView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: hpx(12),
  },
  radioButtonView: {
    flexDirection: "row",
    alignItems: "center",
  },
});
