import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import {
  fonts,
  colors,
  wpx,
  hpx,
  mobileRegex,
  emailRegex,
  passwordRegex,
  getDeviceInfo,
} from "../../../../constants/constant";
import { PosterLoginStyles } from "./PosterLoginStyles";
import { CustomText } from "../../../../common/CustomText/CustomText";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import DeviceInfo from "react-native-device-info";
import axios from "axios";
import { types } from "../../../../store/auth/actions";

const PosterLogin = ({ navigation }) => {
  const dispatch = useDispatch();
  const [mobileEmail, setMobileEmail] = useState("");
  const [validMobileEmail, setValidMobileEmail] = useState("");
  let user_type_id = 3
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const { loader } = useSelector(
    state => ({
      loader: state.globalReducer.loader,
    }),
    shallowEqual,
  );
  console.log("loader value", loader);

  useEffect(() => {
    if (mobileEmail) {
      if (emailRegex.test(mobileEmail.trim().toLowerCase()) || mobileRegex.test(mobileEmail)) {
        setValidMobileEmail(true);
      } else {
        setValidMobileEmail(false);
      }
    } else {
      setValidMobileEmail(false);
    }

    if (password) {
      if (passwordRegex.test(password)) {
        setValidPassword(true);
      } else {
        setValidPassword(false);
      }
    } else {
      setValidPassword(false);
    }
  }, [mobileEmail, password]);

  ///Handle Login functionality
  const loginVerification = () => {
    let data = {
      email: mobileEmail,
      password: password,
      device_type: DeviceInfo.getSystemName(),
      user_type_id: 3,
    };
    dispatch({
      type: types.POSTER_LOGIN,
      payload: {
        params: data,
        navigation: navigation,
      },
    });
  };


  return (
    <SafeAreaView style={PosterLoginStyles.mainContainer}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        overScrollMode={"never"}
        style={PosterLoginStyles.container}>
        <View>
          {/* <Text style={PosterLoginStyles.mainHeading}>Login</Text> */}
          <CustomText text="Login" semiBold eh1 style={{ marginTop: hpx(73) }} />

          <CustomText
            text="Please login via credentials or continue with social account"
            regular
            oh5
            style={{ color: colors.grey, width: wpx(293) }}
          />
        </View>
        <View style={PosterLoginStyles.formView}>
          <CustomTextInput
            placeholder="Email ID"
            onChangeText={e => setMobileEmail(e)}
            value={mobileEmail}
            maxLength={30}
            errorMessage={mobileEmail && !validMobileEmail ? "Invalid Credentials" : null}
          />
          <CustomTextInput
            setShowPassword={() => setShowPassword(!showPassword)}
            showPassword={showPassword}
            type="password"
            placeholder="Password"
            onChangeText={e => setPassword(e)}
            value={password}
            errorMessage={password && !validPassword ? "Invalid Credentials" : null}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <CustomText text="Forgot Password?" oh6 semiBold style={PosterLoginStyles.forgetPassText} />
        </TouchableOpacity>

        <CustomButton
          disabled={!mobileEmail || !password || !validMobileEmail || !validPassword}
          onPress={() => loginVerification()}
          style={{ marginTop: hpx(60) }}
          nextIcon={"true"}
          title={"Continue"}
          loader={loader}
        />

        <View style={PosterLoginStyles.alreadyRegister}>
          {/* <Text style={PosterLoginStyles.continueText}>
            Don't have any account?{' '}
          </Text> */}
          <CustomText text="Don't have any account? " regular eh5 style={PosterLoginStyles.continueText} />
          <TouchableOpacity onPress={() => navigation.navigate("PosterRegistration")}>
            {/* <Text style={PosterLoginStyles.termsAndCondText}>Register Now</Text> */}
            <CustomText text="Register Now" oh6 semiBold style={PosterLoginStyles.termsAndCondText} />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default PosterLogin;
