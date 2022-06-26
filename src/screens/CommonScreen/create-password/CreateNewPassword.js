import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import Header from "../../../common/Header/Header";
import { icons, fonts, wpx, hpx, hp } from "../../../constants/constant";
import { CustomButton } from "../../../common/CustomButton/CustomButton";
import CustomTextInput from "../../../common/CustomTextInput/CustomTextInput";
import { CreateNewPasswordStyles } from "./CreateNewPasswordStyle";
import { useDispatch } from "react-redux";
import { types } from "../../../store/action/ActionTypes";

const CreateNewPassword = ({ navigation, route }) => {
  const { codedata, emailId } = route.params;
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(true);
  const [password1, setPassword1] = useState("");

  const [pwd, setPwd] = useState("");

  const onReset = () => {
    if (pwd) {
      let body = {
        OTP: codedata,
        NewPassword: pwd,
        email: emailId,
      };
      dispatch({
        type: types.RESET_PASSWORD,
        payload: body,
      });
    } else {
    }
  };

  return (
    <SafeAreaView style={CreateNewPasswordStyles.mainContainer}>
      <View style={{ marginHorizontal: wpx(20) }}>
        <Header leftIcon={icons.backIcon} onLeftPress={() => navigation.goBack()} />
        <View style={{ marginTop: hpx(10) }}>
          <Text style={CreateNewPasswordStyles.mainHeading}>Create New Password</Text>
          <Text style={CreateNewPasswordStyles.description}>
            Your new password must be different from previous used passwords.
          </Text>
        </View>
        <CustomTextInput
          style={{ marginTop: hpx(30) }}
          setShowPassword={() => setShowPassword(!showPassword)}
          showPassword={showPassword}
          type="password"
          placeholder="Password"
          onChangeText={e => setPassword(e)}
          value={password}
        />
        <CustomTextInput
          style={{ marginTop: hpx(5) }}
          setShowPassword={() => setShowPassword1(!showPassword1)}
          showPassword1={showPassword1}
          type="password"
          placeholder="Password"
          onChangeText={e => setPassword1(e)}
          value={password1}
        />
        {/* <CustomTextInput
             setShowPassword={() => setShowPassword(!showPassword)}
             showPassword={showPassword}
            type="password"
            placeholder="Confirm Password"
            onChangeText={e => setPwd(e)}
            value={pwd}
          /> */}
        <CustomButton
          onPress={() => onReset()}
          // onPress={() => navigation.navigate('OTPVerification')}
          title={"Reset Password"}
          nextIcon={true}
          style={{ marginTop: hp(5) }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreateNewPassword;
