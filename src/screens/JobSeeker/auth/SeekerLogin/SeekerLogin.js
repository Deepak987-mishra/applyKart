import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from "react-native";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { SmallHorizontalLine } from "../../../../common/HorizontalLine/HorizontalLine";
import { icons, fonts, hpx, wpx, mobileRegex, emailRegex, passwordRegex } from "../../../../constants/constant";
import { SeekerLoginStyles } from "./SeekerLoginStyles";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
import DeviceInfo from "react-native-device-info";
// import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";

const SeekerLogin = ({ navigation }) => {
  const dispatch = useDispatch();

  const { loader } = useSelector(
    state => ({
      loader: state.globalReducer.loader,
    }),
    shallowEqual,
  );

  const [mobileEmail, setMobileEmail] = useState("");
  const [validMobileEmail, setValidMobileEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

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
  // useEffect(() => {
  //   GoogleSignin.configure();
  // }, []);
  // const handleGoogleSignIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log("userInfo", userInfo);
  //     // this.setState({ userInfo });
  //   } catch (error) {
  //     console.log("error", error);
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (e.g. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };

  ///Handle Seeker  Login functionality

  // const data = {
  //   email: mobileEmail,
  //   password: password,
  //   device_type: DeviceInfo.getSystemName(),
  //   user_type_id: 2,
  // };

  const loginVerification = () => {
    dispatch({
      type: types.SEEKER_LOGIN,
      payload: {
        email: mobileEmail,
        password: password,

        device_type: DeviceInfo.getSystemName(),
        user_type_id: 2,
      },
    });
  };

  // const loginVerification = () => {
  //   if (emailRegex.test(mobileEmail.trim().toLowerCase()) || mobileRegex.test(mobileEmail)) {
  //     setValidMobileEmail(true);
  //   } else {
  //     setValidMobileEmail(false);
  //   }

  //   if (password) {
  //     if (passwordRegex.test(password)) {
  //       setValidPassword(true);
  //     } else {
  //       setValidPassword(false);
  //     }
  //   } else {
  //     setValidPassword(false);
  //   }
  //   dispatch({
  //     type: types.SEEKER_LOGIN,
  //     payload: data,
  //   });
  // };

  return (
    <SafeAreaView style={SeekerLoginStyles.mainContainer}>
      <View style={SeekerLoginStyles.container}>
        <View>
          <Text style={SeekerLoginStyles.mainHeading}>Login</Text>
          <Text style={SeekerLoginStyles.description}>
            Please login via credentials or continue with social account.
          </Text>
        </View>
        <View style={SeekerLoginStyles.formView}>
          <CustomTextInput
            placeholder="Mobile number or Email ID"
            onChangeText={e => setMobileEmail(e)}
            value={mobileEmail}
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
          <Text style={SeekerLoginStyles.forgetPassText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* <CustomButton
          onPress={() => navigation.navigate('VCardStart')}
          style={{marginTop: hpx(70)}}
          nextIcon={'true'}
          title={'Continue'}
        /> */}
        <CustomButton
          disabled={!mobileEmail && !password}
          onPress={() => loginVerification()}
          style={{ marginTop: hpx(70) }}
          nextIcon={"true"}
          title={"Continue"}
          loader={loader}
        />
        <View style={SeekerLoginStyles.registerWithview}>
          <SmallHorizontalLine style={{ marginTop: hpx(5) }} />
          <Text
            style={{
              ...SeekerLoginStyles.termsAndCondText,
              marginHorizontal: wpx(15),
            }}>
            Or Login with
          </Text>
          <SmallHorizontalLine style={{ marginTop: hpx(5) }} />
        </View>
        <View style={SeekerLoginStyles.socialIconMainView}>
          <TouchableOpacity onPress={() => alert("Coming Soon")} style={{ ...SeekerLoginStyles.socialMediaIconView }}>
            <Image source={icons.googleIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Coming Soon")} style={{ ...SeekerLoginStyles.socialMediaIconView }}>
            <Image source={icons.facebookIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert("Coming Soon")} style={{ ...SeekerLoginStyles.socialMediaIconView }}>
            <Image source={icons.appleIcon} />
          </TouchableOpacity>
        </View>
        <View style={SeekerLoginStyles.alreadyRegister}>
          <Text style={SeekerLoginStyles.continueText}>Don't have any account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SeekerRegistration")}>
            <Text style={SeekerLoginStyles.termsAndCondText}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SeekerLogin;


  