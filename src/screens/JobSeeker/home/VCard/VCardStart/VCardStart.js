import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Image, ScrollView } from "react-native";
import Header from "../../../../../common/Header/Header";
import { hp, hpx, icons, wpx } from "../../../../../constants/constant";
import { CustomButton } from "../../../../../common/CustomButton/CustomButton";
import { CustomText } from "../../../../../common/CustomText/CustomText";
import { VCardStartStyles } from "./VCardStartStyles";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../../../../store/action/ActionTypes";

const VCardStart = ({ navigation }) => {
  const dispatch = useDispatch();

  const { seekerLoginData, loginData } = useSelector(
    state => ({
      seekerLoginData: state.authReducer.seekerLoginData,
      loginData: state.authReducer.loginData,
    }),
    shallowEqual,
  );

  useEffect(() => {
    dispatch({
      type: types.GET_JOB_SEEKER_DETAIL,
      payload: loginData?.user_Id,
    });
  }, []);

  return (
    <SafeAreaView style={VCardStartStyles.mainContainer}>
      <Header leftIcon={icons.backIcon} onLeftPress={() => navigation.navigate("SeekerLogin")} />
      <ScrollView
        style={VCardStartStyles.container}
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: hpx(50), flexGrow: 1 }}>
        <View>
          <CustomText
            text="Let’s start with creating your Visiting Card(V-Card)"
            style={VCardStartStyles.mainHeading}
          />
          <CustomText
            text="This will be your resume and qualifications that help the employer and companies to know you better"
            style={VCardStartStyles.description}
          />
        </View>
        <View style={{ alignSelf: "center" }}>
          <Image source={icons.dummy_vcard} />
        </View>
        <CustomButton
          onPress={() => navigation.navigate("VCardVaccination", {
            isEdit: false
          })}
          style={{ marginTop: hpx(160) }}
          title="Let’s Go"
          nextIcon={true}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default VCardStart;
