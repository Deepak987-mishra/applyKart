import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from "react-native";
import CustomTextInput from "../../../../common/CustomTextInput/CustomTextInput";
import { CustomButton } from "../../../../common/CustomButton/CustomButton";
import { SmallHorizontalLine } from "../../../../common/HorizontalLine/HorizontalLine";
import { icons, fonts, hpx, emailRegex, mobileRegex, passwordRegex } from "../../../../constants/constant";
import { SeekerRegistrationStyles } from "./SeekerRegistrationStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { types } from "../../../../store/action/ActionTypes";
// import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";

const SeekerRegistration = ({ navigation }) => {
  const dispatch = useDispatch();

  const { loader } = useSelector(
    state => ({
      loader: state.globalReducer.loader,
    }),
    shallowEqual,
  );

  const [emailId, setEmailId] = useState("");
  const [validEmail, setValidEmail] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [mobileNo, setMobileNo] = useState("");
  const [validMobile, setValidMobile] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const SocialMediaIcon = props => {
    return (
      <TouchableOpacity
        onPress={() => props.onPress()}
        style={{
          ...SeekerRegistrationStyles.socialMediaIconView,
          ...props.style,
        }}>
        <Image source={props.icon} />
      </TouchableOpacity>
    );
  };
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

  useEffect(() => {
    if (emailId) {
      if (emailRegex.test(emailId.trim().toLowerCase())) {
        setValidEmail(true);
      } else {
        setValidEmail(false);
      }
    } else {
      setValidEmail(false);
    }

    if (mobileNo) {
      if (mobileRegex.test(mobileNo)) {
        setValidMobile(true);
      } else {
        setValidMobile(false);
      }
    } else {
      setValidMobile(false);
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
  }, [emailId, mobileNo, password]);

  const onSubmit = () => {
    dispatch({
      type: types.SEEKER_SIGNUP,
      payload: {
        email: emailId,
        phone_no: `${countryCode}${mobileNo}`,
        password: password,
        user_type_id: 2,
      },
    });
  };

  return (
    <SafeAreaView style={SeekerRegistrationStyles.mainContainer}>
      <KeyboardAwareScrollView
        style={SeekerRegistrationStyles.mainContainer}
        contentContainerStyle={{ paddingBottom: hpx(50) }}>
        <View style={SeekerRegistrationStyles.container}>
          <View>
            <Text style={SeekerRegistrationStyles.mainHeading}>Register Accounts</Text>
            <Text style={SeekerRegistrationStyles.description}>
              Please fill your detail and find a job &#38; grow your career
            </Text>
          </View>
          <View style={SeekerRegistrationStyles.formView}>
            <CustomTextInput
              placeholder="Email ID"
              onChangeText={e => setEmailId(e)}
              value={emailId}
              errorMessage={emailId && !validEmail ? "Invalid Email Address" : null}
            />
            <CustomTextInput
              code={code => setCountryCode(code)}
              type="mobile"
              placeholder="Mobile number"
              keyboardType={"phone-pad"}
              onChangeText={e => setMobileNo(e)}
              value={mobileNo}
              maxLength={15}
              errorMessage={mobileNo && !validMobile ? "Invalid Mobile Number" : null}
            />
            <CustomTextInput
              setShowPassword={() => setShowPassword(!showPassword)}
              showPassword={showPassword}
              type="password"
              placeholder="Password"
              onChangeText={e => setPassword(e)}
              value={password}
              errorMessage={
                password && !validPassword ? "Password should be alpha numeric and must be eight characters " : null
              }
            />
          </View>
          <View style={SeekerRegistrationStyles.termsAndCondMainView}>
            <Text style={SeekerRegistrationStyles.continueText}>By Continuing you confirm that you agree with </Text>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Text style={{ ...SeekerRegistrationStyles.continueText }}>our </Text>
              <TouchableOpacity style={SeekerRegistrationStyles.termsAndCondButtonView}>
                <Text style={SeekerRegistrationStyles.termsAndCondText}>Terms and Conditions</Text>
              </TouchableOpacity>
            </View>
          </View>

          <CustomButton
            disabled={!validEmail || !validMobile || !validPassword}
            loader={loader}
            title="Continue"
            style={{ marginTop: hpx(40) }}
            onPress={() => onSubmit()}
          />
          <View style={SeekerRegistrationStyles.registerWithview}>
            <SmallHorizontalLine style={{ marginTop: hpx(5) }} />
            <Text
              style={{
                ...SeekerRegistrationStyles.termsAndCondText,
                marginHorizontal: "2%",
              }}>
              Or Register with
            </Text>
            <SmallHorizontalLine style={{ marginTop: hpx(5) }} />
          </View>
          <View style={SeekerRegistrationStyles.socialIconMainView}>
            <TouchableOpacity
              onPress={() => alert("Coming Soon")}
              style={{ ...SeekerRegistrationStyles.socialMediaIconView }}>
              <Image source={icons.googleIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert("Coming Soon")}
              style={{ ...SeekerRegistrationStyles.socialMediaIconView }}>
              <Image source={icons.facebookIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert("Coming Soon")}
              style={{ ...SeekerRegistrationStyles.socialMediaIconView }}>
              <Image source={icons.appleIcon} />
            </TouchableOpacity>
          </View>
          <View style={SeekerRegistrationStyles.alreadyRegister}>
            <Text style={SeekerRegistrationStyles.continueText}>Already on Applykart? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SeekerLogin")}>
              <Text style={SeekerRegistrationStyles.termsAndCondText}>Login Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SeekerRegistration;
