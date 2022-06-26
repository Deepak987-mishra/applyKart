import { StyleSheet } from "react-native";
import { colors, fonts, hpx, nf, wpx } from "../../../../constants/constant";

export const JobPostingCandidateReqStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerStyle: {
    backgroundColor: "#FFFFFF",
  },
  scrollViewContainer: {
    flex: 1,
  },

  JobSkillView: { marginTop: hpx(20) },
  JobSkillTextInputView: { marginTop: hpx(10) },
  speacialReqView: { marginTop: hpx(15) },
  checkBoxView: {
    flexDirection: "row",
    marginTop: hpx(20),
    marginRight: wpx(49),
  },
  checkBoxContentVoiew: { marginLeft: wpx(10) },
  checkBoxText: { marginTop: hpx(20) },
  vaccineView: { marginTop: hpx(20) },
  visatypeView: { marginTop: hpx(32) },
  descriptionView: { marginTop: hpx(15) },
  descriptionTextInputView: { marginTop: hpx(10) },
  radioBtnmainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hpx(20),
  },
  radioBtnViewWithContent: { flexDirection: "row", marginTop: hpx(16) },
  radioBtnViewWithContent1: { flexDirection: "row", marginTop: hpx(10) },
  radioBtnView: { flexDirection: "row", justifyContent: "space-between" },
  nextButton: {
    marginVertical: wpx(10),
  },
  skillContainer: {
    flexDirection: "row",
    backgroundColor: colors.offWhite2,
    borderRadius: wpx(8),
    margin: wpx(5),
    height: hpx(50),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: wpx(10),
  },
});
