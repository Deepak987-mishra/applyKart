import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

const SplashScreen = ({ navigation }) => {
  const loginData = useSelector(state => state.authReducer.currentUser);
  const is_Completed = useSelector(state => state.jobseekerReducer.jobSeekerDetail?.is_Completed ? state.jobseekerReducer.jobSeekerDetail?.is_Completed : 0);

  console.log("splash", loginData)
  useFocusEffect(
    useCallback(() => {
      if (loginData == undefined || loginData == null || loginData?.user_type_id == 2) {
      // if (loginData == undefined || loginData == null || is_Completed == 0) {
        navigation.navigate("OnBoarding");
      } else {
        navigation.navigate("DrawerNav", { screen: "Home" });
      }
    }, [])
  );
  return <View style={{ flex: 1 }}></View>;
};
export default SplashScreen;
