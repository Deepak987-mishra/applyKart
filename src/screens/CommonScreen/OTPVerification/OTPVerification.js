import { Text, View, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Header from "../../../common/Header/Header";
import { hp, hpx, icons, wpx } from "../../../constants/constant";
import { CustomButton } from "../../../common/CustomButton/CustomButton";
import { OTPVerificationStyles } from "./OTPVerificationStyles";
// import { types } from 'react-native-document-picker';
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "react-native-snackbar";
import { types } from "../../../store/action/ActionTypes";
import { convertMetroRawSourceMapToStandardSourceMap } from "react-native-obfuscating-transformer/dist/composeSourceMaps";

const OTPVerification = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const loader = useSelector(state => state.globalReducer.loader)
  const [wrongOtp, setWrongOtp] = useState(false);
  const { user_id, screen ,email, phone_no} = route.params;
  const [codedata, setCodedata] = useState("");
  const [resendTimer, setResendTimer] = useState(false);
  const [time, setTime] = useState(30);
 
console.log("rrrrrr",user_id,screen,email,phone_no);
  useEffect(() => {
    if (time == 0) {
      setResendTimer(true)
    }
    else if (time != 0) {
      setResendTimer(false)
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);

  const onVerify = () => {
    if ( codedata){
      // if( route.params?.otp != codedata ){
      //   Snackbar.show({ text: "Please enter correct OTP", duration: Snackbar.LENGTH_LONG });
      // } else{
        let body = {
          user_id: user_id,
          otp: codedata,
        };
        dispatch({
          type: types.VERIFY_OTP,
          payload: { body, screen },
        });
      // }
    } else {
      Snackbar.show({ text: "Please enter OTP", duration: Snackbar.LENGTH_LONG });

    }
  };

  const onResend = () =>{
    setTime(30);
    dispatch({
      type: types.RESEND_OTP,
      payload:{
        user_id:user_id,
        phone_no:phone_no,
        email:email,
        screen:screen
      }
    });
  }

  const showAlert = () =>
    Alert.alert(
      "ApplyKart would like to access your location",
      "we need to access your location to show you relevant search results",
      [
        {
          text: "Don't Allow",
          style: "default",
        },
        {
          text: "Allow",
          style: "default",
          onPress: () => navigation.navigate("ForgetPassword"),
        },
      ],
    );

  return (
    <SafeAreaView style={OTPVerificationStyles.mainContainer}>
       <Header leftIcon={icons.backIcon} onLeftPress={() => navigation.goBack()} />
      <View style={{ marginHorizontal: wpx(20) }}>
        <View>
         
          <Text style={OTPVerificationStyles.mainHeading}>OTP Verification</Text>
          <Text style={OTPVerificationStyles.description}>
            Please enter OTP received on your mobile number 
          </Text>
        </View>
        <OTPInputView
          style={{ height: hp(10), marginTop: hp(5) }}
          pinCount={6}
          code={codedata} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => setCodedata(code)}
          autoFocusOnLoad={true}
          keyboardType={"number-pad"}
          keyboardAppearance={"default"}
          // codeInputHighlightStyle={{backgroundColor: '#7ACBDA'}}
          codeInputFieldStyle={OTPVerificationStyles.underlineStyleBase}
        />
        <Text style={OTPVerificationStyles.timeText}>
          00:{time.toLocaleString("en-US", { minimumIntegerDigits: 2 })}
        </Text>

        <CustomButton 
        // disabled={!wrongOtp}
        loader={loader} onPress={() => onVerify()} title={"Verify"} nextIcon={true} style={{ marginTop: hpx(55) }} />

       {resendTimer? <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            marginTop: hpx(25),
          }}>
          <Text style={OTPVerificationStyles.receiveOtp}>Didn't receive the OTP? </Text>
          <TouchableOpacity onPress={()=>onResend()}>
            <Text style={OTPVerificationStyles.termsAndCondText}>Resend</Text>
          </TouchableOpacity>
        </View>:null}
      </View>
    </SafeAreaView>
  );
};

export default OTPVerification;

