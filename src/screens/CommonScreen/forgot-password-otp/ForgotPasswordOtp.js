import { Text, View, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Header from '../../../common/Header/Header';
import { hp, hpx, icons, wpx } from '../../../constants/constant';
import { CustomButton } from '../../../common/CustomButton/CustomButton';
import { OTPVerificationStyles } from './OTPVerificationStyles';
// import { types } from 'react-native-document-picker';
import { useDispatch } from 'react-redux';
import { types } from '../../../store/action/ActionTypes';
import { ForgotPasswordOtpStyle } from './ForgotPasswordOtpStyle';
import CustomTextInput from '../../../common/CustomTextInput/CustomTextInput';

const ForgotPasswordOtp = ({ navigation, route }) => {
  const [mobileEmail, setMobileEmail] = useState('');
  const dispatch = useDispatch();
  const { emailId } = route.params;
  const [codedata, setCodedata] = useState('');
  const [time, setTime] = useState(30);

  useEffect(() => {
    if (time == 0) {
      setTime(0);
    }
    if (time != 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [time]);

  const onVerify = () => {
    if (codedata) {
      navigation.navigate('CreateNewPassword', {
        codedata, emailId
      })
    }
    else {

    }
    // dispatch({
    //   type:types.RESET_PASSWORD,
    //   payload:body
    // })
  }

  const showAlert = () =>
    Alert.alert(
      'ApplyKart would like to access your location',
      'we need to access your location to show you relevant search results',
      [
        {
          text: "Don't Allow",
          style: 'default',
        },
        {
          text: 'Allow',
          style: 'default',
          onPress: () => navigation.navigate('ForgetPassword'),
        },
      ],
    );
  return (
    <SafeAreaView style={ForgotPasswordOtpStyle.mainContainer}>
      <View style={{ marginHorizontal: wpx(20) }}>
        <Header
          leftIcon={icons.backIcon}
          onLeftPress={() => navigation.goBack()}

        />
        <View>
          <Text style={ForgotPasswordOtpStyle.mainHeading}>
            OTP Verification
          </Text>

          <Text style={ForgotPasswordOtpStyle.description}>
            Please enter OTP received on your Email
          </Text>
        </View>
        <OTPInputView
          style={{ height: hp(10) }}
          pinCount={6}
          code={codedata} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
          onCodeChanged={code => setCodedata(code)}
          autoFocusOnLoad={true}
          keyboardType={'number-pad'}
          keyboardAppearance={'default'}
          // codeInputHighlightStyle={{backgroundColor: '#7ACBDA'}}
          codeInputFieldStyle={ForgotPasswordOtpStyle.underlineStyleBase}
         
        />
        <Text style={ForgotPasswordOtpStyle.timeText}>
          00:{time.toLocaleString('en-US', { minimumIntegerDigits: 2 })}
        </Text>

        <CustomButton
          onPress={() => onVerify()}
          // onPress={() => navigation.navigate('JobDetail')}
          title={'Verify'}
          nextIcon={true}
          style={{ marginTop: hpx(55) }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: hpx(25),
          }}>
          <Text style={ForgotPasswordOtpStyle.receiveOtp}>
            Didn't receive the OTP?{' '}
          </Text>
          <TouchableOpacity>
            <Text style={ForgotPasswordOtpStyle.termsAndCondText}>Resend</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordOtp;
