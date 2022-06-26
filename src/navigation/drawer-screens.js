import React from "react";
import Animated from "react-native-reanimated";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import Home from "../screens/JobPoster/home/HomeScreen/Home";
import JobDetail from "../screens/JobPoster/home/JobDetailScreen/JobDetail";
import InterviewInformation from "../screens/JobPoster/home/InterviewInformation/InterviewInformation";
import JobPostingFillDetail from "../screens/JobPoster/home/JobPostingScreens/JobPostingFilledDetails";
import JobPostingCandidateReq from "../screens/JobPoster/home/JobPostingScreens/JobPostingCandidateRequirementScreen";
import JobSeeker from "../screens/JobPoster/home/JobSeekerDetailScreen/JobSeekerDetail";
import ContactUs from "../screens/JobPoster/home/ContactUs/ContactUs";
import About from "../screens/JobPoster/home/About/About";
import TermsCondition from "../screens/JobPoster/home/TermsAndConditions/TermsAndCondition";
import PrivacyPolicy from "../screens/JobPoster/home/PrivacyPolicy/PrivacyPolicy";
import Faq from "../screens/JobPoster/home/FAQ/Faq";
import EditCompanyDetail from "../screens/JobPoster/home/EditCompanyDetails/EditCompanyDetails";
import ComapnyDetails from "../screens/JobPoster/home/CompanyDetails/CompanyDetail";
import MyProfile from "../screens/JobPoster/home/MyProfile/MyProfile";
import Availability from "../screens/JobPoster/home/Availability/Availability";
import JobAddress from "../screens/JobPoster/home/JobAddress/JobAddress";
import InterviewAddress from "../screens/JobPoster/home/InterviewAddress/InterviewAddress";
import CandidateDetail from "../screens/JobPoster/home/CandidateDetailScreen/CandidateDetail";
import Acknowledgement from "../screens/JobPoster/home/JobPosterAcknowledge/Acknowledgement";
import UploadDocument from "../screens/JobPoster/home/PosterUploadDocument/UploadDocument";
import ShotListedCandidateDetail from "../screens/JobPoster/home/CandidateDetailScreen/ShortListedCandidateDetail";
import SeekerHome from "../screens/JobSeeker/home/HomeScreen/SeekerHome";
import SeekerAppliedJobs from "../screens/JobSeeker/home/SeekerAppliedJobs/SeekerAppliedJobs";
import SeekerJobFilter from "../screens/JobSeeker/home/SeekerJobFilter/SeekerJobFilter";
import { useSelector } from "react-redux";
import SeekerJobDetail from "../screens/JobSeeker/home/SeekerJobDetail/SeekerJobDetail";
import ChangePwd from "../screens/JobPoster/home/ChangePassword/ChangePassword";
import SeekerNewJobs from "../screens/JobSeeker/home/SeekerNewJobs/SeekerNewJobs";
import SeekerNearJobs from "../screens/JobSeeker/home/SeekerNearJobs/SeekerNearJobs";
import SeekerProfile from "../screens/JobSeeker/home/SeekerProfile/SeekerProfile";


// V-Card Screens
import VCardVaccination from "../screens/JobSeeker/home/VCard/VCardVaccination/VCardVaccination";
import VCardWorkDetail from "../screens/JobSeeker/home/VCard/VCardWorkDetail/VCardWorkDetail";
import VCardEducationDetail from "../screens/JobSeeker/home/VCard/VCardEducationDetail/VCardEducationDetail";
import VCardSpecialSkill from "../screens/JobSeeker/home/VCard/VCardSpecialSkill/VCardSpecialSkill";
import SelectJobType from "../screens/JobSeeker/home/SelectJobType/SelectJobType";
import SeekerJobPrefrence from "../screens/JobSeeker/home/SeekerJobPrefrence/SeekerJobPrefrence";
import SetAvailablity from "../screens/JobSeeker/home/HomeScreen/SetAvailablity/SetAvailablity";
import VCardVideoIntroduction from "../screens/JobSeeker/home/VCard/VCardVideoIntroduction/VCardVideoIntroduction";
import VCardVideoIntroductionStart from "../screens/JobSeeker/home/VCard/VCardVideoIntroductionStart/VCardVideoIntroductionStart";
import SeekerPortfolio from "../screens/JobSeeker/home/VCard/SeekerPortfolio/SeekerPortfolio";
import SeekerVCard from "../screens/JobSeeker/home/SeekerVCard/SeekerVCard";
import SeekerFavoriteJobs from "../screens/JobSeeker/home/SeekerFavoriteJobs/SeekerFavoriteJobs";


const Stack = createStackNavigator();
const Screens = ({ navigation, style }) => {
  const StackSelected = useSelector(state => state.globalReducer.stackSelected);

  return (
    <Animated.View style={[styles.stack, style]}>
      {StackSelected == "Poster" && (
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTitle: null,
            headerLeft: null,
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="JobDetail" component={JobDetail} />
          <Stack.Screen name="InterviewInformation" component={InterviewInformation} />
          <Stack.Screen name="Availability" component={Availability} />
          <Stack.Screen name="JobAddress" component={JobAddress} />
          <Stack.Screen name="InterviewAddress" component={InterviewAddress} />
          <Stack.Screen name="JobPostingFillDetail" component={JobPostingFillDetail} />
          <Stack.Screen name="JobPostingCandidateReq" component={JobPostingCandidateReq} />
          <Stack.Screen name="Jobseeker" component={JobSeeker} />
          <Stack.Screen name="CandidateDetails" component={CandidateDetail} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="TermsCondition" component={TermsCondition} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="Faq" component={Faq} />
          <Stack.Screen name="EditCompanyDetail" component={EditCompanyDetail} />
          <Stack.Screen name="ComapnyDetails" component={ComapnyDetails} />
          <Stack.Screen name="MyProfile" component={MyProfile} />
          <Stack.Screen name="ChangePwd" component={ChangePwd} />
          <Stack.Screen name="Acknowledgement" component={Acknowledgement} />
          <Stack.Screen name="UploadDocument" component={UploadDocument} />
          <Stack.Screen name="ShotListedCandidateDetail" component={ShotListedCandidateDetail} />
          <Stack.Screen name="CandidateDetail" component={CandidateDetail} />
        </Stack.Navigator>
      )}
      {StackSelected == "Seeker" && (
        <Stack.Navigator
          screenOptions={{
            headerTransparent: true,
            headerTitle: null,
            headerLeft: null,
          }}>
          <Stack.Screen name="SeekerHome" component={SeekerHome} />
          <Stack.Screen name="SeekerAppliedJobs" component={SeekerAppliedJobs} />
          <Stack.Screen name="SeekerJobFilter" component={SeekerJobFilter} />
          <Stack.Screen name="SeekerJobDetail" component={SeekerJobDetail} />
          <Stack.Screen name="SeekerNewJobs" component={SeekerNewJobs} />
          <Stack.Screen name="SeekerNearJobs" component={SeekerNearJobs} />
          <Stack.Screen name="ContactUs" component={ContactUs} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="TermsCondition" component={TermsCondition} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="Faq" component={Faq} />
          <Stack.Screen name="SeekerProfile" component={SeekerProfile} />
          <Stack.Screen name="SeekerPortfolio" component={SeekerPortfolio} />
          <Stack.Screen name="SeekerVCard" component={SeekerVCard} />
          <Stack.Screen name="SeekerFavoriteJobs" component={SeekerFavoriteJobs} />

          {/* V-Card Screens */}
          <Stack.Screen name="VCardVaccination" component={VCardVaccination} />
          <Stack.Screen name="VCardWorkDetail" component={VCardWorkDetail} />
          <Stack.Screen name="VCardEducationDetail" component={VCardEducationDetail} />
          <Stack.Screen name="VCardSpecialSkill" component={VCardSpecialSkill} />
          <Stack.Screen name="SelectJobType" component={SelectJobType} />
          <Stack.Screen name="SeekerJobPrefrence" component={SeekerJobPrefrence} />
          <Stack.Screen name="SetAvailablity" component={SetAvailablity} />
          <Stack.Screen name="VCardVideoIntroductionStart" component={VCardVideoIntroductionStart} />
          <Stack.Screen name="VCardVideoIntroduction" component={VCardVideoIntroduction} />


        </Stack.Navigator>
      )}
    </Animated.View>
  );
};

export default Screens;

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    overflow: "hidden",
  },
});
