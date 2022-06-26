import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Pressable } from "react-native";
import { icons, wpx, hpx, hp, wp } from "../../../constants/constant";
import { AccountTypeStyles } from "./AccountTypeStyles";
import { BottomModal } from "../../../common/BottomModal/BottomModal";
import { CustomText } from "../../../common/CustomText/CustomText";
import { CustomButton } from "../../../common/CustomButton/CustomButton";
import { NavigationHelpersContext } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { types } from "../../../store/action/ActionTypes";

const AccountType = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const [isHiringFor, setIsHiringFor] = useState("company");
  const dispatch = useDispatch();
  const setUserType = userType => {
    if (userType == "Poster") {
      dispatch({
        type: types.SWITCH_STACK,
        payload: userType,
      });
      setModal(!modal);
      navigation.navigate("PosterRegistration");
    } else {
      dispatch({
        type: types.SWITCH_STACK,
        payload: userType,
      });
      navigation.navigate("SeekerRegistration");
    }
  };

  const bottomModal = () => {
    return (
      <BottomModal visible={modal} onModalPress={() => setModal(!modal)}>
        <View style={{ marginHorizontal: wpx(20) }}>
          <CustomText text="You are Hiring for?" eh1 bold />
        </View>
        <View style={{ marginTop: hpx(21) }}>
          <TouchableOpacity onPress={() => setIsHiringFor("company")} style={AccountTypeStyles.detailView}>
            <View style={{ flex: 0.1 }}>
              <Image source={isHiringFor == "company" ? icons.radio_button_on : icons.radio_button_off} />
            </View>
            <View style={{ flex: 0.9 }}>
              <CustomText text="Hiring for my own company" oh5 regular />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsHiringFor("client")} style={AccountTypeStyles.rowContainer}>
            <View style={{ flex: 0.1 }}>
              <Image source={isHiringFor == "client" ? icons.radio_button_on : icons.radio_button_off} />
            </View>
            <View style={{ flex: 0.9 }}>
              <CustomText text="Hiring for my client" oh5 regular />
            </View>
          </TouchableOpacity>
        </View>

        <CustomButton title="Continue" nextIcon style={{ marginTop: hpx(50) }} onPress={() => setUserType("Poster")} />
      </BottomModal>
    );
  };

  return (
    <SafeAreaView style={AccountTypeStyles.mainContainer}>
      {bottomModal()}
      <View style={AccountTypeStyles.container}>
        <View style={AccountTypeStyles.subContainer}>
          <CustomText eh1 semiBold text="Choose Account Type" style={AccountTypeStyles.heading} />
          <CustomText
            oh5
            regular
            text="Please select account type to log in the application"
            style={AccountTypeStyles.description}
          />
        </View>

        <TouchableOpacity onPress={() => setUserType("Seeker")} style={AccountTypeStyles.accountTypeView}>
          <Image source={icons.cadidateIcon} style={{ width: wp(20) }} resizeMode="contain" />
          <View>
            <CustomText eh2 semiBold text="Candidate" style={AccountTypeStyles.mainHeading} />
            <CustomText
              oh5
              regular
              text="It's easy to find out your dream job here. A little inspiration and motivation can go a long way in the job search process."
              style={AccountTypeStyles.typeDescription}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setModal(!modal)} style={AccountTypeStyles.accountTypeView}>
          <Image source={icons.job_poster} style={{ width: wp(20) }} resizeMode="contain" />
          <View>
            <CustomText eh2 semiBold text="Job Poster" style={AccountTypeStyles.mainHeading} />
            <CustomText
              oh5
              regular
              text="Tell us about your project and post job. A little inspiration and motivation can go a long way in the job poster process."
              style={AccountTypeStyles.typeDescription}
            />
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default AccountType;
