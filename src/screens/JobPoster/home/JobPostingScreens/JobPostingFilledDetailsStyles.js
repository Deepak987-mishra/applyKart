import { StyleSheet } from "react-native";
import { colors, fonts, hpx, nf, wpx } from "../../../../constants/constant";

export const JobPostingFillDetailStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerStyle: {
    backgroundColor: "#FFFFFF",
  },
  scrollViewContainer: {
    marginTop: hpx(20),
    marginHorizontal: wpx(20),
    flex: 1,
  },
  radioBtnmainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop:wpx(10)
   
  },
  radioBtnViewWithContent: { flexDirection: "row",  alignItems: "center", marginTop:wpx(10) },
  radioBtnViewWithContent4: { flexDirection: "row",  alignItems: "center", marginTop:wpx(1) },
  radioBtnmainContainer3:{flexDirection: "row",  alignItems: "center", justifyContent:'space-between'},
  radioBtnViewWithContent1: { flexDirection: "row", marginTop: hpx(10), justifyContent:'space-between' },
  radioBtnView: { flexDirection: "row", justifyContent: "space-between" },
  JobTitleView: { marginTop: hpx(20) },
  jobTitleTextInputView: { marginTop: hpx(10) },
  jobRoleView: { },
  jobRoleTextInputView: { marginTop: hpx(10) },
  jobTypeView: { marginTop: hpx(15) },
  radioBtnContentTextView: { marginLeft: wpx(10) },
  educationDropdownView: { marginTop: hpx(10) },
  languageDropdownView: { marginTop: hpx(10) },
  nextButton: {
    // marginTop: hpx(31),
    // flex: 0.2,
    marginVertical: wpx(20),
  },
  femaleView: { flexDirection: "row", marginTop: hpx(16), marginLeft: wpx(33) },
  nonBinaryView: {
    flexDirection: "row",
    marginTop: hpx(16),
    marginLeft: wpx(20),
  },
  salaryView: { marginTop: hpx(15) },
  minView: { marginRight: hpx(10) },
  baseView: { marginRight:wpx(60) },
  vacancyView: { marginTop: hpx(15) },
  vacancyTextInputView: { marginTop: wpx(5) },
  expDropdown: { marginTop: hpx(15) },
  textInputStyle1: { height: hpx(50), width: wpx(100) },
  textInputStyle2: { height: hpx(50), width: wpx(100), marginLeft: wpx(20) },
  baseDropdown: { height: hpx(50), width: wpx(105), marginLeft: wpx(20) },
});
