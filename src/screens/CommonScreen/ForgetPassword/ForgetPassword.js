import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import Header from "../../../common/Header/Header";
import { icons, fonts, wpx, hpx, hp } from "../../../constants/constant";
import { CustomButton } from "../../../common/CustomButton/CustomButton";
import CustomTextInput from "../../../common/CustomTextInput/CustomTextInput";
import { useDispatch } from "react-redux";
import { types } from "../../../store/action/ActionTypes";
import { ForgetPasswordStyles } from "./ForgetPasswordStyles";

const ForgetPassword = ({ navigation, route }) => {
  // const {user_id} = route.params;
  const dispatch = useDispatch();
  const [emailId, setEmailId] = useState("");

  const onSend = () => {
    if (emailId) {
      dispatch({
        type: types.GENERATE_OTP_FORGOT_PASSWORD,
        screen: "ForgotPasswordOtp",
        emailId: emailId,
      });
      // navigation.navigate('ForgotPasswordOtp', {
      //   emailId,
      // })
    } else {
    }
  };

  return (
    <SafeAreaView style={ForgetPasswordStyles.mainContainer}>
       <Header
          leftIcon={icons.backIcon}
          onLeftPress={() => navigation.goBack()}
        />
      <View style={{ marginHorizontal: wpx(20) }}>
       
        <View style={{ marginTop: hpx(10) }}>
          <Text style={ForgetPasswordStyles.mainHeading}>Forgot Password?</Text>
          <Text style={ForgetPasswordStyles.description}>
            Enter the email address associated with your account. We'll send you an email with instructions on resetting
            your password.
          </Text>
        </View>
        <CustomTextInput
          style={{ marginTop: hpx(30) }}
          placeholder="Email id"
          onChangeText={e => setEmailId(e)}
          value={emailId}
        />
        <CustomButton
          onPress={() => onSend()}
          // onPress={() => navigation.navigate('ForgotPasswordOtp',{
          //   emailId,
          // })}
          title={"Send"}
          nextIcon={true}
          style={{ marginTop: hp(5) }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgetPassword;
