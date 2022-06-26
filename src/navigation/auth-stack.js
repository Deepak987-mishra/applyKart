import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
// Common Screen
import OnBoarding from "../screens/CommonScreen/OnBoarding/OnBoarding";
import AccountType from "../screens/CommonScreen/AccountType/AccountType";
import OTPVerification from "../screens/CommonScreen/OTPVerification/OTPVerification";
import ForgetPassword from "../screens/CommonScreen/ForgetPassword/ForgetPassword";

// Job Seeker
import SeekerLogin from "../screens/JobSeeker/auth/SeekerLogin/SeekerLogin";
import SeekerRegistration from "../screens/JobSeeker/auth/SeekerRegistration/SeekerRegistration";
import CreateNewPassword from "../screens/CommonScreen/create-password/CreateNewPassword";
import VCardVaccination from "../screens/JobSeeker/home/VCard/VCardVaccination/VCardVaccination";
import VCardStart from "../screens/JobSeeker/home/VCard/VCardStart/VCardStart";
import VCardWorkDetail from "../screens/JobSeeker/home/VCard/VCardWorkDetail/VCardWorkDetail";
import VCardEducationDetail from "../screens/JobSeeker/home/VCard/VCardEducationDetail/VCardEducationDetail";
import VCardSpecialSkill from "../screens/JobSeeker/home/VCard/VCardSpecialSkill/VCardSpecialSkill";
import SelectJobType from "../screens/JobSeeker/home/SelectJobType/SelectJobType";
import SeekerJobPrefrence from "../screens/JobSeeker/home/SeekerJobPrefrence/SeekerJobPrefrence";
import SetAvailablity from "../screens/JobSeeker/home/HomeScreen/SetAvailablity/SetAvailablity";
import VCardVideoIntroduction from "../screens/JobSeeker/home/VCard/VCardVideoIntroduction/VCardVideoIntroduction";
import LaunchScreen from "../screens/JobSeeker/home/LaunchScreen/LaunchScreen";
import VCardVideoIntroductionStart from "../screens/JobSeeker/home/VCard/VCardVideoIntroductionStart/VCardVideoIntroductionStart";
// Job Poster
import PosterLogin from "../screens/JobPoster/auth/PosterLogin/PosterLogin";
import PosterRegistration from "../screens/JobPoster/auth/PosterRegistration/PosterRegistration";
import DrawerNavigator from "./drawer-navigation";
import SplashScreen from "../screens/CommonScreen/splash-screen";
import ChangePassword from "../screens/JobPoster/home/ChangePassword/ChangePassword";
import ForgotPasswordOtp from "../screens/CommonScreen/ForgotPasswordOtp/ForgotPasswordOtp";
import Availability from "../screens/JobPoster/home/Availability/Availability";

const AuthNavigator = createStackNavigator();
function AuthStack() {
  return (
    <AuthNavigator.Navigator initialRouteName={"SplashScreen"} screenOptions={{ headerShown: false }}>
      <AuthNavigator.Screen name="SplashScreen" component={SplashScreen} />
      <AuthNavigator.Screen name="OnBoarding" component={OnBoarding} />
      <AuthNavigator.Screen name="PosterLogin" component={PosterLogin} />
      <AuthNavigator.Screen name="PosterRegistration" component={PosterRegistration} />
      <AuthNavigator.Screen name="ForgetPassword" component={ForgetPassword} />
      <AuthNavigator.Screen name="CreateNewPassword" component={CreateNewPassword} />
      <AuthNavigator.Screen name="AccountType" component={AccountType} />
      <AuthNavigator.Screen name="OTPVerification" component={OTPVerification} />
      <AuthNavigator.Screen name="ChangePassword" component={ChangePassword} />
      <AuthNavigator.Screen name="SeekerLogin" component={SeekerLogin} />
      <AuthNavigator.Screen name="ForgotPasswordOtp" component={ForgotPasswordOtp} />
      <AuthNavigator.Screen name="SeekerRegistration" component={SeekerRegistration} />

      <AuthNavigator.Screen name="VCardStart" component={VCardStart} />
      <AuthNavigator.Screen name="VCardVaccination" component={VCardVaccination} />
      <AuthNavigator.Screen name="VCardWorkDetail" component={VCardWorkDetail} />
      <AuthNavigator.Screen name="VCardEducationDetail" component={VCardEducationDetail} />
      <AuthNavigator.Screen name="VCardSpecialSkill" component={VCardSpecialSkill} />
      <AuthNavigator.Screen name="SelectJobType" component={SelectJobType} />
      <AuthNavigator.Screen name="SeekerJobPrefrence" component={SeekerJobPrefrence} />
      <AuthNavigator.Screen name="SetAvailablity" component={SetAvailablity} />
      <AuthNavigator.Screen name="LaunchScreen" component={LaunchScreen} />
      <AuthNavigator.Screen name="VCardVideoIntroductionStart" component={VCardVideoIntroductionStart} />
      <AuthNavigator.Screen name="VCardVideoIntroduction" component={VCardVideoIntroduction} />
      <AuthNavigator.Screen name="DrawerNav" component={DrawerNavigator} />
    </AuthNavigator.Navigator>
  );
}

export default AuthStack;
